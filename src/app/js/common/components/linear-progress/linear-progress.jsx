import "./linear-progress.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";

export class LinearProgress extends Component {
    render() {
        const progress = Math.min(this.props.currentValue / this.props.targetValue, 1) * 100;
        return (
            <div className="app-linear-progress">
                <div className="app-linear-progress-indicator-container">
                    <div className="app-linear-progress-indicator" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="app-linear-progress-message">
                    {this.props.message}
                </div>
            </div>
        );
    }
}

LinearProgress.propTypes = {
    currentValue: PropTypes.number,
    targetValue: PropTypes.number,
    message: PropTypes.string,
}