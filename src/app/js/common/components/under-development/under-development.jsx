import "./under-development.scss";

import React, { Component } from "react";

import MaterialIcon from "@material/react-material-icon";
import messages from "app/js/common/utils/messages";

export class UnderDevelopment extends Component {
    render() {
        return (
            <div className="app-under-development flex-stretch text-mute">
                <MaterialIcon className="app-under-development-icon" icon="build" />
                <h3>{messages.common.components.underDevelopment.header}</h3>
                <span>{messages.common.components.underDevelopment.text}</span>
            </div>
        );
    }
}