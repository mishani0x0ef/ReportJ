import "./template.scss";

import React, { Component } from "react";

import Button from "@material/react-button";
import { ListItem } from "app/js/common/components/list/list";
import PropTypes from "prop-types";

export class Template extends Component {
    constructor() {
        super();
        this.state = {
            mode: "read",
        };
    }

    render() {
        if (this.state.mode === "edit") {
            return (
                <ListItem className="app-template-editor-list-item">
                    <textarea rows="3" defaultValue={this.props.template.description} />
                    <div className="pull-right">
                        <Button onClick={() => this.discardChanges()}>Cancel</Button>
                        <Button
                            outlined={true}
                            onClick={() => this.saveChanges()}>
                            Save
                        </Button>
                    </div>
                </ListItem>
            );
        }
        return (
            <ListItem onClick={() => this.startEdit()}>
                {this.props.template.description}
            </ListItem>
        );
    }

    startEdit() {
        this.setState({ mode: "edit" });
    }

    saveChanges() {
        // todo: save changes. MR
        this._endEdit();
    }

    discardChanges() {
        this._endEdit();
    }

    _endEdit() {
        this.setState({ mode: "read" });
    }
}

Template.propTypes = {
    template: PropTypes.any,
}