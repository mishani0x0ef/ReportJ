import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import Switch from "@material/react-switch";

export class MainOptions extends Component {
    constructor() {
        super();
        this.storage = new BrowserStorage();
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