import React, { Component } from "react";

import { MainOptions } from "./main-options/main-options";
import { TemplatesOptions } from "./templates-options/templates-options";
import { visitor } from "app/js/common/services/analytics";

export class GeneralOptions extends Component {
    constructor() {
        super();
        visitor.pageview("/options/general").send();
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