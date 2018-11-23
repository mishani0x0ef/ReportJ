import React, { Component } from "react";

import config from "app/config";
import { visitor } from "app/js/common/services/analytics";

export class About extends Component {
    get issuesPage() {
        return `${this.state.app.homePage}/issues`;
    }

    constructor() {
        super();
        this.state = {
            app: config.app
        };
        visitor.pageview("/options/about").send();
    }

    render() {
        return (
            <section>
                <h2>{this.state.app.name} v{this.state.app.version}</h2>
                <p>This extension designed to improve reporting experience inside JIRA system. It's made to make reporting easier and provide short way for adding of main report parts such as issue title or your previous commits information.</p>
                <p>Idea and functionality of extension was gets from personal experience of work with JIRA. And I will be happy to hear about your suggestions. You can <a href={this.state.app.feedbackPage} target="blank">leave a comment</a>.</p>
                <p>If you want to help to improve extension you can visit <a href={this.state.app.homePage} target="blank">GitHub page</a> and put your weight.</p>
                <h4>Useful links:</h4>
                <ul>
                    <li>
                        <a href={this.state.app.feedbackPage} target="blank">Chrome Store page</a>
                    </li>
                    <li>
                        <a href={this.state.app.homePage} target="blank">GitHub page</a>
                    </li>
                    <li>
                        <a href={this.issuesPage} target="blank">Opened issues</a>
                    </li>
                </ul>
            </section>
        );
    }
}