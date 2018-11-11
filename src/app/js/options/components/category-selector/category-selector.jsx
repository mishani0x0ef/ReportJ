import "./category-selector.scss";

import React, { Component } from "react";

import { About } from "../about/about";
import { CommitsOptions } from "../commints-options/commints-options";
import { GeneralOptions } from "../general-options/general-options";
import Tab from "@material/react-tab";
import TabBar from "@material/react-tab-bar";

export class CategorySelector extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
        };
    }

    render() {
        const category = this._getCategory();

        return (
            <div>
                <TabBar
                    activeIndex={this.state.activeIndex}
                    handleActiveIndexUpdate={(activeIndex) => this.setState({ activeIndex })}
                >
                    <Tab>
                        <span className="mdc-tab__text-label">General</span>
                    </Tab>
                    <Tab>
                        <span className="mdc-tab__text-label">Repositories</span>
                    </Tab>
                    <Tab>
                        <span className="mdc-tab__text-label">About</span>
                    </Tab>
                </TabBar>
                <section className="app-category-selector">
                    {category}
                </section>
            </div>
        );
    }

    _getCategory() {
        switch (this.state.activeIndex) {
            case 1:
                return <CommitsOptions />;
            case 2:
                return <About />;
            default:
                return <GeneralOptions />;
        }
    }
}