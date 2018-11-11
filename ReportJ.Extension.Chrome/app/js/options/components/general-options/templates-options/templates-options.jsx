import { List, ListButtonItem } from "app/js/common/components/list/list";
import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { Template } from "./template/template";
import { afterRender } from "app/js/common/utils/react";
import { browser } from "app/js/common/globals";

export class TemplatesOptions extends Component {
    constructor() {
        super();
        this.storage = new BrowserStorage(browser);
        this.state = {
            templates: [],
        };
        this._init();
    }

    render() {
        return (
            <div>
                <h2>Templates</h2>
                <List>
                    {this.state.templates.map((template, i) => this._renderTemplate(template, i))}
                    <ListButtonItem
                        icon="add_circle_outline"
                        text="Add Template"
                        onClick={() => this.addTemplate()}>
                    </ListButtonItem>
                </List>
            </div>
        );
    }

    addTemplate() {
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
        const initialMode = typeof template.templateId === "undefined" ? "edit" : "read";
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