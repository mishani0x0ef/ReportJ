import { List, ListButtonItem } from "app/js/common/components/list/list";
import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { Template } from "./template/template";
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
        throw new Error("Not implemented");
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
                onTemplateChanged={() => this._init()} />
        );
    }
}