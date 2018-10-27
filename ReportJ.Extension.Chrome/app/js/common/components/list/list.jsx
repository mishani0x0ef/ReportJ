import "./list.scss";

import React, { Component } from "react";

import Button from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";
import PropTypes from "prop-types";

export class List extends Component {
    render() {
        return (
            <div className="app-list">
                {this.props.children}
            </div>
        );
    }
}

List.propTypes = {
    children: PropTypes.any,
}

export class ListItem extends Component {
    render() {
        return (
            <div className="app-list-item">
                {this.props.children}
            </div>
        );
    }
}

ListItem.propTypes = {
    children: PropTypes.any,
}

export class ListButtonItem extends Component {
    render() {
        const icon = this.props.icon ? <MaterialIcon icon={this.props.icon} /> : null;
        return (
            <div className="app-list-item app-list-item-button">
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
    text: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.any,
}