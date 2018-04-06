import "./list.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";
import { callIfExist } from "~/js/content/common/functionUtil";
import { classIf } from "~/js/content/common/reactUtil";

export class List extends Component {
    renderListItem(content) {
        return (
            <div className="reportj-list-item" onClick={callIfExist(content.click)}>
                {content}
            </div>
        );
    }

    render() {
        return (
            <div className={`reportj-list ${classIf(this.props.borderVisible, "reportj-has-border")}`}>
                {this.props.children.map((child) => this.renderListItem(child))}
            </div>
        );
    }
}

List.propTypes = {
    children: PropTypes.any,
    borderVisible: PropTypes.bool,
}