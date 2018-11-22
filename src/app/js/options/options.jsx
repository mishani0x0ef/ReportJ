import "./options.scss";

import React, { Component } from "react";

import { CategorySelector } from "./components/category-selector/category-selector";
import { Header } from "./components/header/header";

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