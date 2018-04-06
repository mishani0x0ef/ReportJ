import "./templateSelector.scss";

import React, { Component } from "react";

import { List } from "~/js/content/common/components/list/list";
import { Popup } from "~/js/content/common/components/popup/popup";
import PropTypes from "prop-types";
import { callIfExist } from "~/js/content/common/functionUtil";

export class TemplateSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopupVisible: false,
            templates: [
                "Rick getting mad and drink all whiskey.",
                "Morty is scaried and wonna go home.",
                "Your mom is a well know character.",
                "Rick getting mad and drink all whiskey.",
                "Morty is scaried and wonna go home.",
                "Your mom is a well know character.",
                "Rick getting mad and drink all whiskey.",
                "Morty is scaried and wonna go home.",
                "Your mom is a well know character.",
            ],
        };
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

    renderTemplateItem(text) {
        return (
            <p className="text-justify" onClick={() => this.submitSelectedTemplate(text)}>{text}</p>
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
                    <div className="reportj-popup-section">
                        <h3>Templates</h3>
                        <List borderVisible={true}>
                            {this.state.templates.map((templ) => this.renderTemplateItem(templ))}
                        </List>
                    </div>
                    <div className="reportj-popup-section reportj-buttons-section">
                        <a className="aui-button aui-button-link cancel" onClick={() => this.closePopup()}>Cancel</a>
                    </div>
                </Popup>
            </section>
        );
    }
}

TemplateSelector.propTypes = {
    onSubmit: PropTypes.func,
}