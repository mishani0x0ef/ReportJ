import "./loading.scss";

import React, { Component } from "react";

import MaterialIcon from "@material/react-material-icon";
import PropTypes from "prop-types";

export class Loading extends Component {
    render() {
        return (
            <div className="app-loading">
                <div className="app-loading-icon-container">
                    <MaterialIcon className="app-loading-icon" icon="autorenew" />
                </div>
                <div className="app-loading-text">{this.props.text}</div>
            </div>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string,
}