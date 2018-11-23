import React, { Component } from "react";

import { UnderDevelopment } from "app/js/common/components/under-development/under-development";
import { visitor } from "app/js/common/services/analytics";

export class Commits extends Component {
    constructor() {
        super();
        visitor.pageview("/popup/commits").send();
    }

    render() {
        return (
            <UnderDevelopment />
        );
    }
}