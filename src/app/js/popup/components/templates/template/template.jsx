import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { ListItem } from "app/js/common/components/list/list";
import { Notification } from "app/js/common/components/notification/notification";
import PropTypes from "prop-types";

export class Template extends Component {
    constructor() {
        super();
        this._handleClick = this._handleClick.bind(this);
        this.notification = React.createRef();
        this.storage = new BrowserStorage();
    }

    render() {
        return (
            <ListItem
                data-clicked="Added"
                onClick={this._handleClick}>
                <span>{this.props.template.description}</span>
                <Notification text="Added" ref={this.notification} />
            </ListItem>
        );
    }

    _handleClick() {
        if (typeof this.props.onClick === "function") {
            const message = this.props.template.description;
            this.props.onClick(message);
            this.notification.current.show();
            this.storage.upvoteTemplate(this.props.template);
        }
    }
}

Template.propTypes = {
    template: PropTypes.any,
    onClick: PropTypes.func,
}