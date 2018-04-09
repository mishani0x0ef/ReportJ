import "./templateSelector.scss";

import { Popup, PopupButtonsSection, PopupSection } from "~/js/content/common/components/popup/popup";
import React, { Component } from "react";

import { JiraCancelButton } from "~/js/content/common/components/button/button";
import { List } from "~/js/content/common/components/list/list";
import { ProductPlacement } from "~/js/content/common/components/productPlacement/productPlacement";
import PropTypes from "prop-types";
import { callIfExist } from "~/js/util/function";
import { getSettingsUrl } from "~/js/util/browser";

export class TemplateSelector extends Component {
    constructor(props) {
        super(props);

        this.storageService = props.storageService;
        this.browser = props.browser;

        this.state = {
            isPopupVisible: false,
            templates: [],
        };

        this.initTemplates();
    }

    initTemplates() {
        this.storageService.getTemplates()
            .then((templates) => {
                const templateDescriptions = templates.map((t) => t.description);
                this.setState({ templates: templateDescriptions });
            });
    }

    showPopup() {
        this.setState({ isPopupVisible: true });
    }

    closePopup() {
        this.setState({ isPopupVisible: false });
    }

    submitSelectedTemplate(text) {
        callIfExist(this.props.onSubmit, text);
        this.closePopup();
    }

    renderTemplates() {
        if (this.state.templates && this.state.templates.length > 0) {
            return (
                <List headerText="Templates" borderVisible={true}>
                    {this.state.templates.map((templ, index) => this.renderTemplateItem(templ, index))}
                </List>
            );
        }

        return (
            <section className="text-center">
                <h4>We have not found templates!</h4>
                <h5>
                    <span>You can </span>
                    <a href={getSettingsUrl(this.browser)} target="_blank">add your first one</a>
                </h5>
            </section>
        );
    }

    renderTemplateItem(text, key) {
        return (
            <p key={key} className="text-justify" onClick={() => this.submitSelectedTemplate(text)}>{text}</p>
        );
    }

    render() {
        return (
            <section className="reportj-template-selector">
                <a className="reportj-text-link" onClick={() => this.showPopup()}>
                    <span>Use power of ReportJ.</span>
                    <span className="reportj-link" title="Select comment from templates"></span>
                </a>
                <Popup visible={this.state.isPopupVisible}>
                    <PopupSection>
                        {this.renderTemplates()}
                    </PopupSection>
                    <PopupButtonsSection>
                        <ProductPlacement />
                        <JiraCancelButton text="Cancel" onClick={() => this.closePopup()} />
                    </PopupButtonsSection>
                </Popup>
            </section>
        );
    }
}

TemplateSelector.propTypes = {
    onSubmit: PropTypes.func,
    storageService: PropTypes.any,
    browser: PropTypes.any,
}