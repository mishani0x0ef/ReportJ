import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import IconButton from "@material/react-icon-button";
import { ListItem } from "app/js/common/components";
import MaterialIcon from "@material/react-material-icon";
import PropTypes from "prop-types";
import { browser } from "app/js/common/globals";

export class ReadTemplate extends Component {
    constructor() {
        super();

        this.storage = new BrowserStorage(browser);
    }

    render() {
        return (
            <ListItem onClick={(e) => this.onClick(e)}>
                <div className="app-template-read-content">
                    <span>{this.props.template.description}</span>
                    <IconButton title="Remove template" onClick={(e) => this.removeTemplate(e)}>
                        <MaterialIcon icon="clear" />
                    </IconButton>
                </div>
            </ListItem>
        );
    }

    async removeTemplate(e) {
        e.stopPropagation();
        await this.storage.removeTemplate(this.props.template.templateId);
        if (this.props.onDeleted) {
            this.props.onDeleted(this.props.template);
        }
    }

    onClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }
}

ReadTemplate.propTypes = {
    template: PropTypes.any,
    onDeleted: PropTypes.func,
    onClick: PropTypes.func,
}