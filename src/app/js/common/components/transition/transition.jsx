import "./transition.scss";

import React, { Component } from "react";

import { CSSTransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

export class FadeTransition extends Component {
    render() {
        return <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={250}>
            {this.props.children}
        </CSSTransitionGroup>;
    }
}

FadeTransition.propTypes = {
    children: PropTypes.any
}

export class ScaleTransition extends Component {
    render() {
        return <CSSTransitionGroup
            transitionName="scale"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={250}>
            {this.props.children}
        </CSSTransitionGroup>;
    }
}

ScaleTransition.propTypes = {
    children: PropTypes.any
}