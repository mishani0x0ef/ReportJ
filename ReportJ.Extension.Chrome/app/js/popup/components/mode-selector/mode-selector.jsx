import React, { Component } from "react";

export class ModeSelector extends Component {
    render() {
        return (
            <section>
                <ul className="nav nav-tabs">
                    <li className="active" role="presentation">
                        <a href="#templates" aria-controls="templates" role="tab" data-toggle="tab">Templates</a>
                    </li>
                    <li role="presentation">
                        <a href="#commits" aria-controls="commits" role="tab" data-toggle="tab">Commits</a>
                    </li>

                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane fade active in popup-content" id="templates">
                            templates
                        </div>
                    </div>

                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane fade active in popup-content" id="commits">
                            Commits
                        </div>
                    </div>
                </ul>
            </section>
        );
    }
}