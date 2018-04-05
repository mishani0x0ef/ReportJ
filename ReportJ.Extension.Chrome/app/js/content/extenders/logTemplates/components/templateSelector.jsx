import React, { Component } from "react";

import PropTypes from "prop-types";
import { callIfExist } from "~/js/content/common/functionUtil";

export class TemplateSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    showPopup() {
        callIfExist(this.props.onSubmit, "Mock!!!! Please implement real using of templates");
    }

    render() {
        return (
            <a className="reportj-text-link" onClick={() => this.showPopup()}>
                <span>Use power of ReportJ.</span>
                <span className="reportj-link" title="Select comment from templates"></span>
            </a>
        );
    }
}

TemplateSelector.propTypes = {
    onSubmit: PropTypes.func,
}