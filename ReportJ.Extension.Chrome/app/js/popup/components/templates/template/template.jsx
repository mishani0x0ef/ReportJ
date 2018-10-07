import React, { Component } from "react";

import PropTypes from "prop-types";

export class Template extends Component {
    constructor() {
        super();

        this._handleClick = this._handleClick.bind(this);
    }

    render() {
        return (
            <div onClick={this._handleClick} className="app-list-item" data-clicked="Added">
                <span>{this.props.template.description}</span>
            </div>
        );
    }

    _handleClick() {
        if (typeof this.props.onClick === "function") {
            const template = this.props.template.description;
            this.props.onClick(template);
        }
    }
}

Template.propTypes = {
    template: PropTypes.any,
    onClick: PropTypes.func,
}