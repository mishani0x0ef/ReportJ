import React, { Component } from "react";

import { UnderDevelopment } from "app/js/common/components/under-development/under-development";
import messages from "app/js/common/utils/messages";

export class Commits extends Component {
    render() {
        return (
            <div className="app-list flex-stretch" aria-orientation="vertical">
                <UnderDevelopment />
            </div>
        );
    }
}