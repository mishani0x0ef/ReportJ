import "./template-options.scss";

import { FadeTransition, LinearProgress, List, ListButtonItem, NoTemplatesMessage, Snackbar } from "app/js/common/components";
import React, { Component } from "react";
import { eventCategory, visitor } from "app/js/common/services/analytics";

import BrowserStorage from "app/js/common/services/browserStorage";
import IconButton from "@material/react-icon-button";
import MaterialIcon from "@material/react-material-icon";
import { Template } from "./template/template";
import { afterRender } from "app/js/common/utils/react";
import messages from "app/js/common/utils/messages";

export class TemplatesOptions extends Component {
    constructor() {
        super();
        this.storage = new BrowserStorage();
        this.undoSnackbar = null;
        this.state = {
            templates: [],
            deletedTemplates: [],
            maxTemplates: 10,
        };
        this._init();
    }

    render() {
        const templates = this.state.templates.map((t, i) => this._renderTemplate(t, i));
        const isTemplatesEmpty = templates.length === 0;
        const exceedLimit = templates.length >= this.state.maxTemplates;

        return (
            <div className="app-templates-options">
                <div className="app-templates-options-header">
                    <h2>Templates</h2>
                    <IconButton
                        title="Add Template"
                        className="mdc-icon-button-large"
                        disabled={exceedLimit}
                        onClick={() => this.addTemplate()}>
                        <MaterialIcon icon="add_circle_outline" />
                    </IconButton>
                </div>
                <List>
                    {isTemplatesEmpty && <NoTemplatesMessage onTemplateAdd={() => this.addTemplate()} />}
                    <FadeTransition>
                        {templates}
                        <ListButtonItem
                            key="add"
                            icon="add_circle_outline"
                            text="Add Template"
                            disabled={exceedLimit}
                            onClick={() => this.addTemplate()}>
                        </ListButtonItem>
                    </FadeTransition>
                </List>
                <LinearProgress
                    currentValue={this.state.templates.length}
                    targetValue={this.state.maxTemplates}
                    message={messages.options.templates.usedTemplates(this.state.templates.length, this.state.maxTemplates)} />
                <Snackbar
                    ref={(snackbar) => { this.undoSnackbar = snackbar }}
                    text={messages.options.templates.undoDelete(this.state.deletedTemplates.length)}
                    actionText="Undo"
                    onClosed={(undo) => this.onDeleteUndo(undo)} />
            </div>
        );
    }

    addTemplate() {
        visitor.event(eventCategory.options, "add template").send();

        if (this.state.templates.length >= this.state.maxTemplates) return;
        const templates = this.state.templates;
        templates.push({ description: "" });
        this.setState({ templates }, () => this._scrollBottom());
    }

    softDelete(template) {
        const templates = this.state.templates.filter((t) => t !== template);
        const deletedTemplates = this.state.deletedTemplates;
        deletedTemplates.push(template);
        this.setState({
            templates,
            deletedTemplates
        });
        this.undoSnackbar.show();
    }

    async onDeleteUndo(doUndo) {
        if (doUndo) {
            const deletedTemplates = this.state.deletedTemplates;
            let template = deletedTemplates.pop();
            while (template) {
                template.templateId = null;
                await this.storage.setTemplate(template);
                template = deletedTemplates.pop();
            }
        }
        this.setState({ deletedTemplates: [] });
        await this._init();
    }

    async _init() {
        const templates = await this.storage.getTemplates();
        this.setState({ templates });
    }

    _renderTemplate(template, key) {
        return (
            <Template
                key={key}
                template={template}
                onDeleted={(t) => this.softDelete(t)}
                onEdited={() => this._init()} />
        );
    }

    _scrollBottom() {
        afterRender(() => self.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth"
        }));
    }
}
