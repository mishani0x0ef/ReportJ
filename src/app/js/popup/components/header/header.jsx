import "./header.scss";

import React, { Component } from "react";
import { eventCategory, visitor } from "app/js/common/services/analytics";

import Button from "@material/react-button";
import IconButton from "@material/react-icon-button";
import JiraWrapper from "app/js/common/services/jira";
import MaterialIcon from "@material/react-material-icon";
import UrlService from "app/js/common/services/urlService";
import { browser } from "app/js/common/globals";

export class Header extends Component {
    constructor() {
        super();

        this.state = {
            isInsideJira: false,
        };
        this._init();
    }

    render() {
        return (
            <div className="header-buttons-container small-section">
                <Button
                    icon={<MaterialIcon icon="add_circle_outline" />}
                    disabled={!this.state.isInsideJira}
                    outlined={true}
                    onClick={() => this.addIssueSummary()}>
                    Add issue summary
                </Button>
                <IconButton title="Open options page" onClick={() => this.openOptions()}>
                    <MaterialIcon icon="settings" />
                </IconButton>
            </div>
        );
    }

    addIssueSummary() {
        visitor.event(eventCategory.popup, "add issue summary").send();

        browser.tabs.getSelected(null, async (tab) => {
            const summary = await this.jira.getIssueInfo(tab.url);
            const code = `document.activeElement.value = ${JSON.stringify(summary)} + document.activeElement.value`;
            browser.tabs.executeScript({ code });
        });
    }

    openOptions() {
        browser.tabs.create({
            url: "options.html"
        });
    }

    async _init() {
        const urlService = new UrlService(browser);
        const url = await urlService.getCurrentBaseUrl();

        this.jira = new JiraWrapper(url);
        const isInsideJira = await this.jira.checkIsInsideJira(url);
        this.setState({ isInsideJira });
    }
}