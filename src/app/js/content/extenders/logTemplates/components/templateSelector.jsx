import "./templateSelector.scss";

import { Popup, PopupButtonsSection, PopupSection } from "app/js/content/components/popup/popup";
import React, { Component } from "react";

import { JiraCancelButton } from "app/js/content/components/button/button";
import { List } from "app/js/content/components/list/list";
import { ProductPlacement } from "app/js/common/components/productPlacement/productPlacement";
import PropTypes from "prop-types";
import { callIfExist } from "app/js/common/utils/function";
import { getSettingsUrl } from "app/js/common/utils/browser";
import isEmpty from "lodash/isEmpty";
import onClickOutside from "react-onclickoutside";

export class TemplateSelectorComponent extends Component {
    constructor(props) {
        super(props);

        this.storage = props.storage;
        this.browser = props.browser;

        this.state = {
            isPopupVisible: false,
            templates: [],
        };

        this.initTemplates();
    }

    async initTemplates() {
        const templates = await this.storage.getTemplates();
        this.setState({ templates })
    }

    showPopup() {
        this.setState({ isPopupVisible: true });
    }

    closePopup() {
        this.setState({ isPopupVisible: false });
    }

    submitSelectedTemplate(template) {
        callIfExist(this.props.onSubmit, template.description);
        this.storage.upvoteTemplate(template);
        this.closePopup();
    }

    renderTemplates() {
        if (!isEmpty(this.state.templates)) {
            return (
                <List>
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

    renderTemplateItem(template, key) {
        return (
            <p key={key} className="text-justify" onClick={() => this.submitSelectedTemplate(template)}>
                {template.description}
            </p>
        );
    }

    render() {
        return (
            <section className="reportj-template-selector">
                <a className="reportj-text-link" onClick={() => this.showPopup()}>
                    <span>Use power of ReportJ</span>
                    <span className="reportj-link" title="Select comment from templates"></span>
                </a>
                <Popup visible={this.state.isPopupVisible}>
                    <PopupSection>
                        <div className="reportj-templates-header">
                            <span className="reportj-templates-header-text">Templates</span>
                            <a href={getSettingsUrl(this.browser)} target="_blank">Open Settings</a>
                        </div>
                    </PopupSection>
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

TemplateSelectorComponent.propTypes = {
    onSubmit: PropTypes.func,
    storage: PropTypes.any,
    browser: PropTypes.any,
}

export const TemplateSelector = onClickOutside(TemplateSelectorComponent, {
    handleClickOutside: function (instance) {
        return () => instance.closePopup();
    }
});