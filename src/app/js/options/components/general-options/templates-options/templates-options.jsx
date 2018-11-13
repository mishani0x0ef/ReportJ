import "./template-options.scss";

import { LinearProgress, List, ListButtonItem, NoTemplatesMessage, Snackbar } from "app/js/common/components";
import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { CSSTransitionGroup } from "react-transition-group";
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
        const templates = this.state.templates.map((t, i) => this._renderTemplate(t, i));
        const isTemplatesEmpty = templates.length === 0;
        const exceedLimit = templates.length >= this.state.maxTemplates;

        return (
            <div className="app-templates-options">
                <h2>Templates</h2>
                <List>
                    {isTemplatesEmpty && <NoTemplatesMessage onTemplateAdd={() => this.addTemplate()} />}
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={250}>
                        {templates}
                        <ListButtonItem
                            key="add"
                            icon="add_circle_outline"
                            text="Add Template"
                            disabled={exceedLimit}
                            onClick={() => this.addTemplate()}>
                        </ListButtonItem>
                    </CSSTransitionGroup>
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
        afterRender(() => window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth"
        }));
    }
}