import "./mode-selector.scss";

import React, { Component } from "react";

import { Commits } from "../commits/commits";
import Tab from "@material/react-tab";
import TabBar from "@material/react-tab-bar";
import { Templates } from "../templates/templates";
import { addTextToInput } from "app/js/util/browser";
import { browser } from "app/js/popup/globals";

export class ModeSelector extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
        };
    }

    render() {
        const modeElement = this.state.activeIndex === 0
            ? <Templates onSelected={(text) => addTextToInput(browser, text)}></Templates>
            : <Commits></Commits>;

        return (
            <div className="app-mode-selector">
                <TabBar
                    activeIndex={this.state.activeIndex}
                    handleActiveIndexUpdate={(activeIndex) => this.setState({ activeIndex })}
                >
                    <Tab>
                        <span className="mdc-tab__text-label">Templates</span>
                    </Tab>
                    <Tab>
                        <span className="mdc-tab__text-label">Commits</span>
                    </Tab>
                </TabBar>
                <section className="app-mode-selector-content">
                    {modeElement}
                </section>
            </div>
        );
    }
}