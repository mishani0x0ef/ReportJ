import "./list.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";
import { callIfExist } from "app/js/common/utils/function";
import { classIf } from "app/js/common/utils/react";

export class List extends Component {
    renderListItem(content, key) {
        return (
            <div key={key} className="reportj-list-item" onClick={callIfExist(content.click)}>
                {content}
            </div>
        );
    }

    render() {
        return (
            <div className="reportj-list-container">
                <div className={`reportj-list ${classIf(this.props.borderVisible, "reportj-has-border")}`}>
                    {this.props.children.map((child, index) => this.renderListItem(child, index))}
                </div>
            </div>
        );
    }
}

List.propTypes = {
    children: PropTypes.any,
    borderVisible: PropTypes.bool,
}