import "./template-options.scss";

import { LinearProgress, List, ListButtonItem, NoTemplatesMessage, Snackbar } from "app/js/common/components";
import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { Template } from "./template/template";
import { afterRender } from "app/js/common/utils/react";
import { browser } from "app/js/common/globals";
import messages from "app/js/common/utils/messages";

export class TemplatesOptions extends Component {
    constructor() {
        super();
        this.storage = new BrowserStorage(browser);
        this.undoSnackbar = null;
        this.state = {
            templates: [],
            deletedTemplates: [],
            maxTemplates: 10,
        };
        this._init();
    }

    render() {
        const emptyTemplates = this.state.templates.length > 0
            ? null
            : <NoTemplatesMessage onTemplateAdd={() => this.addTemplate()} />;

        const exceedLimit = this.state.templates.length >= this.state.maxTemplates;

        return (
            <div className="app-templates-options">
                <h2>Templates</h2>
                <List>
                    {this.state.templates.map((template, i) => this._renderTemplate(template, i))}
                    {emptyTemplates}
                    <ListButtonItem
                        icon="add_circle_outline"
                        text="Add Template"
                        disabled={exceedLimit}
                        onClick={() => this.addTemplate()}>
                    </ListButtonItem>
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
        if (this.state.templates.length >= this.state.maxTemplates) return;
        const templates = this.state.templates;
        templates.push({ description: "" });
        this.setState({ templates }, () => this._scrollBottom());
    }

    softDelete(template) {
        const deletedTemplates = this.state.deletedTemplates;
        deletedTemplates.push(template);
        this.setState({ deletedTemplates });
        if (this.undoSnackbar) {
            this.undoSnackbar.show();
        }
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
            await this._init();
        }
        this.setState({ deletedTemplates: [] });
    }

    async _init() {
        this.setState({
            templates: await this.storage.getTemplates(),
        });
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
        afterRender(() => window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth"
        }));
    }
}