import React, { Component } from "react";

import BrowserStorage from "app/js/common/services/browserStorage";
import { Loading } from "app/js/common/components/loading/loading";
import PropTypes from "prop-types";
import { Template } from "./template/template";
import { browser } from "app/js/common/globals";
import messages from "app/js/common/utils/messages";

export class Templates extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            templates: [],
        };

        this.storage = new BrowserStorage(browser);
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