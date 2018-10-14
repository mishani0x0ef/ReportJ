import "./loading.scss";

import React, { Component } from "react";

import MaterialIcon from "@material/react-material-icon";
import PropTypes from "prop-types";

export class Loading extends Component {
    render() {
        const icon = this._getIcon();
        return (
            <div className="app-loading">
                <div className="app-loading-icon-container">
                    <MaterialIcon className="app-loading-icon" icon={icon} />
                </div>
                <div className="app-loading-text">{this.props.text}</div>
            </div>
        );
    }

    _getIcon() {
        const icons = [
            "favorite_border",
            "child_care",
            "sentiment_very_satisfied",
        ];
        const index = Math.floor(Math.random() * icons.length);
        return icons[index];
    }
}

Loading.propTypes = {
    text: PropTypes.string,
}