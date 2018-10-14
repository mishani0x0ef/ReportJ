import "./options.scss";

import React, { Component } from "react";

import { CategorySelector } from "../category-selector/category-selector";
import { Header } from "../header/header";
import ReactDOM from "react-dom";

export class Options extends Component {
    render() {
        return (
            <div className="app-content-container">
                <div className="app-content">
                    <Header />
                    <CategorySelector />
                </div>
            </div>
        );
    }
}