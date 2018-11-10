import "./template.scss";

import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";

import BrowserStorage from "app/js/common/services/browserStorage";
import Button from "@material/react-button";
import { ListItem } from "app/js/common/components/list/list";
import PropTypes from "prop-types";
import { browser } from "app/js/common/globals";

export class Template extends Component {
    constructor(props) {
        super(props);

        this.storage = new BrowserStorage(browser);
        this.input = null;
        this.state = {
            mode: props.initialMode || "read",
            value: props.template.description,
            length: props.template.description.length,
            maxLength: 255,
        };
    }

    render() {
        if (this.state.mode === "edit") {
            return (
                <ListItem className="app-template-editor-list-item">
                    <TextField
                        label="Your template"
                        textarea={true}
                        dense={true}
                        helperText={
                            <HelperText>{this.state.length}/{this.state.maxLength}</HelperText>
                        }>
                        <Input
                            value={this.state.value}
                            maxLength={this.state.maxLength}
                            ref={input => this.input = input}
                            onChange={(e) => this.onChange(e)} />
                    </TextField>
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
        this.setState({ mode: "edit" }, () => {
            // set timeout to let React update DOM
            setTimeout(() => this._focusTextField(), 0);
        });
    }

    async saveChanges() {
        const template = Object.assign({}, this.props.template, { description: this.state.value });
        await this.storage.setTemplate(template);
        
        this._endEdit();
        if (this.props.onTemplateChanged) {
            this.props.onTemplateChanged();
        }
    }

    discardChanges() {
        this._setValue(this.props.template.description);
        this._endEdit();
    }

    onChange(e) {
        this._setValue(e.target.value);
    }

    _endEdit() {
        this.setState({ mode: "read" });
    }

    _setValue(value) {
        this.setState({
            value,
            length: value.length,
        });
    }

    _focusTextField() {
        if (!this.input) return;

        const inputElement = this.input.inputElement;
        if (inputElement) {
            inputElement.focus();
        }
    }
}

Template.propTypes = {
    initialMode: PropTypes.string,
    template: PropTypes.any,
    onTemplateChanged: PropTypes.func,
}