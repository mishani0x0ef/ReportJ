import React, { Component } from "react";

import { Header } from "../header/header";
import { ModeSelector } from "../mode-selector/mode-selector";

export class Popup extends Component {
    render() {
        return (
            <div className="extension-popup">
                <div className="content">
                    <Header></Header>
                    <ModeSelector></ModeSelector>
                </div>
            </div>
        );
    }
}