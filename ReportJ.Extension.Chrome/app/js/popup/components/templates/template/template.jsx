import React, { Component } from "react";

import PropTypes from "prop-types";

export class Template extends Component {
    render() {
        return (
            <div key={this.props.key} className="app-list-item" data-clicked="Added">
                <span>{this.props.template.description}</span>
            </div>
        );
    }
}

Template.propTypes = {
    key: PropTypes.number,
    template: PropTypes.any,
}