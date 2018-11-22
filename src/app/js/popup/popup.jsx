import "./popup.scss";

import React, { Component } from "react";

import { Header } from "./components/header/header";
import { ModeSelector } from "./components/mode-selector/mode-selector";

export class Popup extends Component {
    render() {
        return (
            <div className="chrome-popup">
                <div className="chrome-popup-header">
                    <Header />
                </div>
                <div className="chrome-popup-content">
                    <ModeSelector />
                </div>
            </div>
        );
    }
}