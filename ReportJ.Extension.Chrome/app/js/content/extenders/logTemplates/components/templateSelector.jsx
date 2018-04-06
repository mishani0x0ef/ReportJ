import React, { Component } from "react";

import { Popup } from "~/js/content/common/components/popup/popup";
import PropTypes from "prop-types";
import { callIfExist } from "~/js/content/common/functionUtil";

export class TemplateSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopupVisible: false,
        };
    }

    showPopup() {
        this.setState({ isPopupVisible: true });
        //callIfExist(this.props.onSubmit, "Mock!!!! Please implement real using of templates");
    }

    render() {
        return (
            <section>
                <a className="reportj-text-link" onClick={() => this.showPopup()}>
                    <span>Use power of ReportJ.</span>
                    <span className="reportj-link" title="Select comment from templates"></span>
                </a>
                <Popup visible={this.state.isPopupVisible}>
                    <p>Lohpidar!</p>
                    <p>Lohpidar!</p>
                    <p>Lohpidar!</p>
                    <p>Lohpidar!</p>
                    <p>Lohpidar!</p>
                </Popup>
            </section>
        );
    }
}

TemplateSelector.propTypes = {
    onSubmit: PropTypes.func,
}