import "./template.scss";

import React, { Component } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import { afterRender, focusInput } from "app/js/common/utils/react";
import { isEnterDown, isEscapeDown } from "app/js/common/utils/key";

import BrowserStorage from "app/js/common/services/browserStorage";
import Button from "@material/react-button";
import IconButton from "@material/react-icon-button";
import { ListItem } from "app/js/common/components/list/list";
import MaterialIcon from "@material/react-material-icon";
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
                            ref={(input) => { this.input = input }}
                            onChange={(e) => this.onChange(e)}
                            onKeyDown={(e) => this.onKeyDown(e)} />
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
                <div className="app-template-read-content">
                    <span>{this.props.template.description}</span>
                    <IconButton title="Remove template" onClick={() => this.removeTemplate()}>
                        <MaterialIcon icon="clear" />
                    </IconButton>
                </div>
            </ListItem>
        );
    }

    componentDidMount() {
        this._focusTextField();
    }

    componentDidUpdate() {
        this._focusTextField();
    }

    startEdit() {
        this.setState({ mode: "edit" });
    }

    async saveChanges() {
        const template = Object.assign({}, this.props.template, { description: this.state.value });
        await this.storage.setTemplate(template);
        this._endEdit();
    }

    async removeTemplate() {
        await this.storage.removeTemplate(this.props.template.templateId);
        this._endEdit();
    }

    discardChanges() {
        this._setValue(this.props.template.description);
        this._endEdit();
    }

    onChange(e) {
        this._setValue(e.target.value);
    }

    onKeyDown(e) {
        if (isEnterDown(e)) {
            this.saveChanges();
        } else if (isEscapeDown(e)) {
            this.discardChanges();
        } else {
            return;
        }
        e.preventDefault();
    }

    _endEdit() {
        this.setState({ mode: "read" });
        if (this.props.onTemplateChanged) {
            this.props.onTemplateChanged();
        }
    }

    _setValue(value) {
        this.setState({
            value,
            length: value.length,
        });
    }

    _focusTextField() {
        afterRender(() => focusInput(this.input));
    }
}

Template.propTypes = {
    initialMode: PropTypes.string,
    template: PropTypes.any,
    onTemplateChanged: PropTypes.func,
}