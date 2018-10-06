import React, { Component } from "react";

import { Commits } from "../commits/commits";
import Tab from "@material/react-tab";
import TabBar from "@material/react-tab-bar";
import { Templates } from "../templates/templates";

export class ModeSelector extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0
        };
    }

    render() {
        const modeElement = this.state.activeIndex === 0
            ? <Templates></Templates>
            : <Commits></Commits>;

        return (
            <div>
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
                <section>
                    {modeElement}
                </section>
            </div>
        );
    }
}