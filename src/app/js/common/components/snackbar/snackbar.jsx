import "./snackbar.scss";

import React, { Component } from "react";

import PropTypes from "prop-types";

export class Snackbar extends Component {
    constructor() {
        super();

        this.closeTimeoutId = null;
        this.state = {
            active: false,
            timeout: 4000,
        };
    }

    render() {
        const classNames = this.state.active ? "mdc-snackbar mdc-snackbar--active" : "mdc-snackbar";
        return (
            <div className={classNames}
                aria-live="assertive"
                aria-atomic="true"
                aria-hidden="true">
                <div className="mdc-snackbar__text">{this.props.text}</div>
                <div className="mdc-snackbar__action-wrapper">
                    <button
                        type="button"
                        className="mdc-snackbar__action-button"
                        onClick={() => this.triggerAction()}>
                        {this.props.actionText}
                    </button>
                </div>
            </div>
        );
    }

    show() {
        clearTimeout(this.closeTimeoutId);
        this.setState({ active: true });
        this.closeTimeoutId = setTimeout(() => this._close(false), this.state.timeout);
    }

    triggerAction() {
        this._close(true);
    }

    _close(isAction) {
        clearTimeout(this.closeTimeoutId);
        this.setState({ active: false });
        if (this.props.onClosed) {
            // let animation do it's job before trigger close.
            setTimeout(() => this.props.onClosed(isAction), 200);
        }
    }
}

Snackbar.propTypes = {
    text: PropTypes.string,
    actionText: PropTypes.string,
    onClosed: PropTypes.func,
}