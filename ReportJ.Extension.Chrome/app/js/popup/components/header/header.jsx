import "./header.scss";

import React, { Component } from "react";

import JiraWrapper from "~/js/services/jira";
import UrlService from "~/js/services/urlService";
import { browser } from "../../globals";

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
            <div className="header-buttons-container mid-section">
                <button className="btn btn-link"
                    disabled={!this.state.isInsideJira}
                    onClick={() => this.addIssueSummary()}>
                    <span className="btn-caption">Add issue summary</span>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>
                <button className="btn btn-link"
                    onClick={() => this.openOptions()}>
                    <span className="btn-caption">Settings</span>
                    <span className="glyphicon glyphicon-cog"></span>
                </button>
            </div>
        );
    }

    addIssueSummary() {
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