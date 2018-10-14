import React, { Component } from "react";

import { MainOptions } from "./main-options/main-options"

export class GeneralOptions extends Component {
    render() {
        return (
            <div>
                <MainOptions />
                <h2>Templates</h2>
            </div>
        );
    }
}