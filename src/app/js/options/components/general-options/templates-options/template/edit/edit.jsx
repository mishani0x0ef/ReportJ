import { LinearProgress, ListItem } from "app/js/common/components";
import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import { afterRender, focusInput } from "app/js/common/utils/react";
import { isEnterDown, isEscapeDown } from "app/js/common/utils/key";

import BrowserStorage from "app/js/common/services/browserStorage";
import Button from "@material/react-button";
import PropTypes from "prop-types";
import { browser } from "app/js/common/globals";
import messages from "app/js/common/utils/messages";
import onClickOutside from "react-onclickoutside";

class EditTemplateComponent extends Component {
    constructor(props) {
        super(props);

        this.storage = new BrowserStorage(browser);
        this.input = null;
        const description = props.template.description;
        this.state = {
            value: description,
            valid: description.length > 0,
            length: description.length,
            maxLength: 255,
        }
    }

    render() {
        const textLength = this.state.length;
        const maxLength = this.state.maxLength;
        const progressText = messages.options.templates.usedSymbols(textLength, maxLength);

        return (
            <ListItem className="app-template-editor-list-item">
                <TextField
                    label="Your template"
                    textarea={true}
                    dense={true}>
                    <Input
                        value={this.state.value}
                        maxLength={maxLength}
                        isValid={this.state.valid}
                        ref={(input) => { this.input = input }}
                        onChange={(e) => this._setValue(e.target.value)}
                        onKeyDown={(e) => this.onKeyDown(e)} />
                </TextField>
                <LinearProgress
                    currentValue={textLength}
                    targetValue={maxLength}
                    message={progressText} />
                <div className="pull-right">
                    <Button onClick={() => this.discardChanges()}>Cancel</Button>
                    <Button onClick={() => this.saveChanges()}>Save</Button>
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

    handleClickOutside() {
        if (this.state.isValid) {
            this.saveChanges();
        } else {
            this.discardChanges();
        }
    }

    async saveChanges() {
        if (!this.state.valid) return;

        const template = this.props.template;
        template.description = this.state.value;
        await this.storage.setTemplate(template);

        this._endEdit();
    }

    discardChanges() {
        this._setValue(this.props.template.description);
        this._endEdit();
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

    _setValue(value) {
        this.setState({
            value,
            length: value.length,
            valid: value.length > 0,
        });
    }

    _endEdit() {
        if (this.props.onEdited) {
            this.props.onEdited();
        }
    }

    _focusTextField() {
        afterRender(() => focusInput(this.input));
    }
}

EditTemplateComponent.propTypes = {
    template: PropTypes.any,
    onEdited: PropTypes.func,
}

export const EditTemplate = onClickOutside(EditTemplateComponent);