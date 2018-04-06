import "./templateSelector.scss";

import { Popup, PopupButtonsSection, PopupSection } from "~/js/content/common/components/popup/popup";
import React, { Component } from "react";

import { JiraCancelButton } from "~/js/content/common/components/button/button";
import { List } from "~/js/content/common/components/list/list";
import { ProductPlacement } from "~/js/content/common/components/productPlacement/productPlacement";
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
                    <PopupSection>
                        <h3>Templates</h3>
                        <List borderVisible={true}>
                            {this.state.templates.map((templ) => this.renderTemplateItem(templ))}
                        </List>
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
}