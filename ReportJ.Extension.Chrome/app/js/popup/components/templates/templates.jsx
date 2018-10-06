import React, { Component } from "react";

import StorageService from "app/js/services/storageService";
import { Template } from "./template/template";
import { browser } from "app/js/popup/globals";

export class Templates extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            templates: [],
        };

        this.storage = new StorageService(browser);
        this._inti();
    }

    render() {
        const content = this.state.isLoading
            ? (<span>Loading...</span>)
            : this.getTemplates(this.state.templates);

        return (
            <div>
                {content}
            </div>
        );
    }

    async _inti() {
        this.setState({ isLoading: true });

        try {
            const templates = await this.storage.getTemplates();
            this.setState({ templates });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    getTemplates(templates) {
        return (
            <div className="app-list" aria-orientation="vertical">
                {templates.map((template, key) => <Template key={key} template={template}></Template>)}
            </div>
        );
    }
}