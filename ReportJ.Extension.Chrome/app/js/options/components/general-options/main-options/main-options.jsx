import React, { Component } from "react";

import Switch from '@material/react-switch';

export class MainOptions extends Component {
    constructor() {
        super();
        this.state = {
            isAutoSummaryEnabled: false,
        }
    }

    render() {
        return (
            <div>
                <h2>General</h2>
                <Switch
                    nativeControlId="auto-summary-switch"
                    checked={this.state.isAutoSummaryEnabled}
                    onChange={(e) => this.setAutoSummary(e.target.checked)} />
                <label htmlFor="auto-summary-switch">Automatically add issue summary to "Log Work" reports</label>
            </div>
        );
    }

    setAutoSummary(enabled) {
        this.setState({ isAutoSummaryEnabled: enabled });
        // TODO: add save to chrom storage. MR
    }
}