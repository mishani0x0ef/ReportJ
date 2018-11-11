import "./no-templates-message.scss";

import React, { Component } from "react";

import MaterialIcon from "@material/react-material-icon";
import PropTypes from "prop-types";

export class NoTemplatesMessage extends Component {
    render() {
        return (
            <div className="app-no-templates-message flex-stretch text-mute">
                <MaterialIcon icon="sentiment_dissatisfied" />
                <h3>No templates found</h3>
                <span>It's a perfect chance to <a href="#" onClick={() => this.addTemplate()}>add your first one</a>.</span>
            </div>
        );
    }

    addTemplate() {
        if (this.props.onTemplateAdd) {
            this.props.onTemplateAdd();
        }
    }
}

NoTemplatesMessage.propTypes = {
    onTemplateAdd: PropTypes.func,
}