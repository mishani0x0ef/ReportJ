import React, { Component } from "react";

import { Notification } from "app/js/common/components/notification/notification";
import PropTypes from "prop-types";

export class Template extends Component {
    constructor() {
        super();
        this._handleClick = this._handleClick.bind(this);
        this.notification = React.createRef();
    }

    render() {
        return (
            <div onClick={this._handleClick} className="app-list-item" data-clicked="Added">
                <span>{this.props.template.description}</span>
                <Notification text="Added" ref={this.notification} />
            </div>
        );
    }

    _handleClick() {
        if (typeof this.props.onClick === "function") {
            const template = this.props.template.description;
            this.props.onClick(template);
            this.notification.current.show();
        }
    }
}

Template.propTypes = {
    template: PropTypes.any,
    onClick: PropTypes.func,
}