import React, { Component } from "react";

import StorageService from "app/js/common/services/storageService";
import Switch from "@material/react-switch";
import { browser } from "app/js/common/globals";

export class MainOptions extends Component {
    constructor() {
        super();
        this.storage = new StorageService(browser);
        this.state = {
            autoIssueSummary: {
                enabled: true,
            },
        };
        this._init();
    }

    render() {
        return (
            <div>
                <h2>General</h2>
                <div className="flex-center">
                    <Switch
                        nativeControlId="auto-summary-switch"
                        checked={this.state.autoIssueSummary.enabled}
                        onChange={(e) => this.setAutoSummary(e.target.checked)} />
                    <label htmlFor="auto-summary-switch">Automatically add issue summary to work reports</label>
                </div>
            </div>
        );
    }

    setAutoSummary(enabled) {
        this.setState({
            autoIssueSummary: {
                enabled: enabled,
            },
        }, () => this._saveChanges());
    }

    async _init() {
        const options = await this.storage.getGeneralSettings();
        this.setState({
            autoIssueSummary: options.autoIssueSummary,
        });
    }

    async _saveChanges() {
        await this.storage.setSettings({
            general: {
                autoIssueSummary: this.state.autoIssueSummary,
            },
        });
    }
}