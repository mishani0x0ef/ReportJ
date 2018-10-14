import React, { Component } from "react";

import { Loading } from "app/js/common/components/loading/loading";
import PropTypes from "prop-types";
import StorageService from "app/js/services/storageService";
import { Template } from "./template/template";
import { browser } from "app/js/popup/globals";
import messages from "app/js/common/utils/messages";

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
        return this.state.isLoading
            ? <Loading text={messages.templates.loading} />
            : this._getTemplates(this.state.templates);
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

    _getTemplates(templates) {
        return (
            <div className="app-list" aria-orientation="vertical">
                {templates.map((template, key) =>
                    <Template
                        key={key}
                        template={template}
                        onClick={(text) => this.props.onSelected(text)}>
                    </Template>
                )}
            </div>
        );
    }
}

Templates.propTypes = {
    onSelected: PropTypes.func,
}