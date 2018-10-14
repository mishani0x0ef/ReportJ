import React, { Component } from "react";

import { Loading } from "app/js/common/components/loading/loading";

export class Commits extends Component {
    render() {
        return (
            <div className="app-list flex-stretch" aria-orientation="vertical">
                <Loading text="Loading your lovely commits..."></Loading>
            </div>
        );
    }
}