import React, { Component } from "react";

import { UnderDevelopment } from "app/js/common/components/under-development/under-development";
import { pageview } from "app/js/common/services/analytics";

export class CommitsOptions extends Component {
    constructor() {
        super();
        pageview("/options/repositories");
    }

    render() {
        return (
            <UnderDevelopment />
        );
    }
}