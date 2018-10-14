import React, { Component } from "react";

export class About extends Component {
    render() {
        return (
            <section>
                <h2>ReportJ 2.9.0</h2>
                <p>This extension designed to improve reporting experience inside JIRA system. It's made to make reporting easier and provide short way for adding of main report parts such as issue title or your previous commits information.</p>
                <p>Idea and functionality of extension was gets from personal experience of work with JIRA. And I will be happy to hear about your suggestions. So, don't hesitate to click on button in right-bottom corner.</p>
                <p>If you want to help to improve extension you could visit <a href="https://github.com/mishani0x0ef/reportj">GitHub page</a> and put your weight. Exspecially i would be appritiated if someone can create extension for Firefox.</p>
            </section>
        );
    }
}