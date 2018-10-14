import React, { Component } from "react";

import { Loading } from "app/js/common/components/loading/loading";
import messages from "app/js/common/utils/messages";

export class Commits extends Component {
    render() {
        return (
            <div className="app-list flex-stretch" aria-orientation="vertical">
                <Loading text={messages.popup.commits.loading} />
            </div>
        );
    }
}