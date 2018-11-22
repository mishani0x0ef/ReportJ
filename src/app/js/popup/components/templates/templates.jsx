import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { List } from "app/js/common/components/list/list";
import { Loading } from "app/js/common/components/loading/loading";
import { NoTemplatesMessage } from "app/js/common/components/no-templates-message/no-templates-message";
import PropTypes from "prop-types";
import { Template } from "./template/template";
import { browser } from "app/js/common/globals";
import messages from "app/js/common/utils/messages";

export class Templates extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            templates: [],
        };

        this.storage = new BrowserStorage();
        this._init();
    }

    render() {
        return this.state.isLoading
            ? <Loading text={messages.popup.templates.loading} />
            : this._getTemplates(this.state.templates);
    }

    openOptions() {
        browser.tabs.create({
            url: "options.html"
        });
    }

    async _init() {
        try {
            const templates = await this.storage.getTemplates();
            this.setState({ templates });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    _getTemplates(templates) {
        if (templates.length > 0) {
            return (
                <List className="no-border no-shadow">
                    {templates.map((template, key) =>
                        <Template
                            key={key}
                            template={template}
                            onClick={(text) => this.props.onSelected(text)}>
                        </Template>
                    )}
                </List>
            );
        }

        return (
            <NoTemplatesMessage onTemplateAdd={() => this.openOptions()} />
        );
    }
}

Templates.propTypes = {
    onSelected: PropTypes.func,
}