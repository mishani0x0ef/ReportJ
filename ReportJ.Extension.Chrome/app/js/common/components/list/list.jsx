import "./list.scss";

import React, { Component } from "react";

import Button from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";
import PropTypes from "prop-types";
import { mergeClassNames } from "app/js/common/utils/react";

export class List extends Component {
    render() {
        const className = mergeClassNames(this.props, "app-list");
        return (
            <div {...this.props} className={className}>
                {this.props.children}
            </div>
        );
    }
}

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
}

export class ListItem extends Component {
    render() {
        const className = mergeClassNames(this.props, "app-list-item");
        return (
            < div {...this.props} className={className} >
                {this.props.children}
            </div >
        );
    }
}

ListItem.propTypes = {
    className: PropTypes.any,
    children: PropTypes.any,
}

export class ListButtonItem extends Component {
    render() {
        const icon = this.props.icon ? <MaterialIcon icon={this.props.icon} /> : null;
        const className = mergeClassNames(this.props, "app-list-item app-list-item-button");
        return (
            <div {...this.props} className={className}>
                <Button
                    icon={icon}
                    disabled={this.props.disabled}
                    onClick={() => this.props.onClick()}>
                    {this.props.text}
                </Button>
            </div>
        );
    }
}

ListButtonItem.propTypes = {
    className: PropTypes.any,
    text: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.any,
}