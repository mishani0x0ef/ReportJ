import React, { Component } from "react";

import { MainOptions } from "./main-options/main-options";
import { TemplatesOptions } from "./templates-options/templates-options";
import { pageview } from "app/js/common/services/analytics";

export class GeneralOptions extends Component {
    constructor() {
        super();
        pageview("/options/general");
    }

    render() {
        return (
            <div>
                <MainOptions />
                <TemplatesOptions />
            </div>
        );
    }
}