import React, { Component } from "react";

import { Header } from "../header/header";

export class Popup extends Component {
    render() {
        return (
            <div className="extension-popup">
                <div className="content">
                    <Header></Header>
                    <section>Tabs</section>
                </div>
            </div>
        );
    }
}