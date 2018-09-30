import "./header.scss";

import React, { Component } from "react";

import { browser } from "../../globals";

export class Header extends Component {
    render() {
        return (
            <div className="header-buttons-container mid-section">
                <button className="btn btn-link">
                    <span className="btn-caption">Add issue summary</span>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>
                <button className="btn btn-link" onClick={() => this.openOptions()}>
                    <span className="btn-caption">Settings</span>
                    <span className="glyphicon glyphicon-cog"></span>
                </button>
            </div>
        );
    }

    openOptions() {
        browser.tabs.create({
            url: "options.html"
        });
    }
}