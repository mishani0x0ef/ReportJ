import "./header.scss";

import React, { Component } from "react";

import JiraWrapper from "~/js/services/jira";
import UrlService from "~/js/services/urlService";
import { browser } from "../../globals";

export class Header extends Component {
    constructor() {
        super();

        this.isInsideJira = false;

        this._initJiraConnection();
    }

    render() {
        return (
            <div className="header-buttons-container mid-section">
                <button className="btn btn-link"
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
        browser.tabs.getSelected(null, (tab) => {
            this.jira.getIssueInfo(tab.url)
                .then((summary) => {
                    const issueSummary = JSON.stringify(summary);
                    const code = `document.activeElement.value = ${issueSummary} + document.activeElement.value`;
                    browser.tabs.executeScript({ code });
                });
        });
    }

    openOptions() {
        browser.tabs.create({
            url: "options.html"
        });
    }

    async _initJiraConnection() {
        const urlService = new UrlService(browser);
        const url = await urlService.getCurrentBaseUrl();

        this.jira = new JiraWrapper(url);
        this.isInsideJira = await this.jira.checkIsInsideJira(url);
    }
}