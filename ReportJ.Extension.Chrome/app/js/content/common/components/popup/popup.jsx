import "./popup.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";
import { classIf } from "~/js/content/common/reactUtil";

export class Popup extends Component {
    render() {
        return (
            <div className="reportj-popup-container">
                <div className={`reportj-popup ${classIf(this.props.visible, "active")}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Popup.propTypes = {
    children: PropTypes.any,
    visible: PropTypes.bool.isRequired
}