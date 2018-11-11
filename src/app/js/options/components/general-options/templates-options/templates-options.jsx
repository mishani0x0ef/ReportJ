import "./template-options.scss";

import { List, ListButtonItem } from "app/js/common/components/list/list";
import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { LinearProgress } from "app/js/common/components/linear-progress/linear-progress";
import { NoTemplatesMessage } from "app/js/common/components/no-templates-message/no-templates-message";
import { Template } from "./template/template";
import { afterRender } from "app/js/common/utils/react";
import { browser } from "app/js/common/globals";
import isNil from "lodash/isNil";
import messages from "app/js/common/utils/messages";

export class TemplatesOptions extends Component {
    constructor() {
        super();
        this.storage = new BrowserStorage(browser);
        this.state = {
            templates: [],
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
            </div>
        );
    }

    addTemplate() {
        if (this.state.templates.length >= this.state.maxTemplates) return;
        const templates = this.state.templates;
        templates.push({ description: "" });
        this.setState({ templates }, () => this._scrollBottom());
    }

    async _init() {
        this.setState({
            templates: await this.storage.getTemplates(),
        });
    }

    _renderTemplate(template, key) {
        const initialMode = isNil(template.templateId) ? "edit" : "read";
        return (
            <Template
                key={key}
                initialMode={initialMode}
                template={template}
                onTemplateChanged={() => this._init()} />
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