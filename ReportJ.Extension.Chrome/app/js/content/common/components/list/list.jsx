import "./list.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";
import { callIfExist } from "~/js/util/function";
import { classIf } from "~/js/util/react";

export class List extends Component {
    renderHeader() {
        if (this.props.headerText) {
            return <p className="reportj-list-header">{this.props.headerText}</p>;
        }
        return null;
    }

    renderListItem(content, key) {
        return (
            <div key={key} className="reportj-list-item" onClick={callIfExist(content.click)}>
                {content}
            </div>
        );
    }

    render() {
        return (
            <div className="reportj-list-conainer">
                {this.renderHeader()}
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
    headerText: PropTypes.string,
}