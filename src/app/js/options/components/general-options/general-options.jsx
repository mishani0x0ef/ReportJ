import React, { Component } from "react";

import { MainOptions } from "./main-options/main-options";
import { TemplatesOptions } from "./templates-options/templates-options"

export class GeneralOptions extends Component {
    render() {
        return (
            <div>
                <MainOptions />
                <TemplatesOptions />
            </div>
        );
    }
}