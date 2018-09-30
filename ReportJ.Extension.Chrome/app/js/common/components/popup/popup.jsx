import "./popup.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";
import { classIf } from "~/js/util/react";

export const PopupSection = ({ children }) => {
    return <div className="reportj-popup-section">{children}</div>;
}

PopupSection.propTypes = {
    children: PropTypes.any,
}

export const PopupButtonsSection = ({ children }) => {
    return <div className="reportj-popup-section reportj-buttons-section">{children}</div>;
}

PopupButtonsSection.propTypes = {
    children: PropTypes.any,
}

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