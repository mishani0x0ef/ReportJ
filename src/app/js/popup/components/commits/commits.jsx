import React, { Component } from "react";

import { UnderDevelopment } from "app/js/common/components/under-development/under-development";
import { pageview } from "app/js/common/services/analytics";

export class Commits extends Component {
    constructor() {
        super();
        pageview("/popup/commits");
    }

    render() {
        return (
            <UnderDevelopment />
        );
    }
}