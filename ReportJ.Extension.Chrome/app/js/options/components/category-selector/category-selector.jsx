import React, { Component } from "react";

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
                <section>
                    {category}
                </section>
            </div>
        );
    }

    _getCategory() {
        switch (this.state.activeIndex) {
        case 1:
            return <h3>Repos</h3>;
        case 2:
            return <h3>About</h3>;
        default:
            return <h3>General</h3>;
        }
    }
}