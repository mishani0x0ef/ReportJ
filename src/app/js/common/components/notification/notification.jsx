import "./notification.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";

const NOTIFICATION_DURATION = 2000;

export class Notification extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        };
    }

    render() {
        const elementClass = this.state.visible
            ? "app-notification app-notification__on"
            : "app-notification";

        return (
            <div className={elementClass}>
                {this.props.text}
            </div>
        );
    }

    show() {
        this.setState({ visible: true });
        setTimeout(() => this._hide(), NOTIFICATION_DURATION);
    }

    _hide() {
        this.setState({ visible: false });
    }
}

Notification.propTypes = {
    text: PropTypes.string,
}