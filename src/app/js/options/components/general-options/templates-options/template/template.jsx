import "./template.scss";

import React, { Component } from "react";

import { EditTemplate } from "./edit/edit";
import PropTypes from "prop-types";
import { ReadTemplate } from "./read/read";
import isNil from "lodash/isNil";

export class Template extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: isNil(props.template.templateId) ? "edit" : "read",
        };
    }

    render() {
        return this.state.mode === "edit"
            ? <EditTemplate
                template={this.props.template}
                onEdited={() => this.onEdited()} />
            : <ReadTemplate
                template={this.props.template}
                onClick={() => this.startEdit()}
                onDeleted={() => this.onDeleted()} />;
    }

    startEdit() {
        this.setState({ mode: "edit" });
    }

    endEdit() {
        this.setState({ mode: "read" });
    }

    onEdited() {
        if (this.props.onEdited) {
            this.props.onEdited(this.props.template);
        }
        this.endEdit();
    }

    onDeleted() {
        if (this.props.onDeleted) {
            this.props.onDeleted(this.props.template);
        }
    }
}

Template.propTypes = {
    template: PropTypes.any,
    onEdited: PropTypes.func,
    onDeleted: PropTypes.func,
}