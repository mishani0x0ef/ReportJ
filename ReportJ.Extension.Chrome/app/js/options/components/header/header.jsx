import "./header.scss";

import React, { Component } from "react";

import ReactDOM from "react-dom";

export class Header extends Component {
    render() {
        return (
            <section className="options-header">
                <img src="img/logo-wide.png" alt="ReportJ"></img>
            </section>
        );
    }
}