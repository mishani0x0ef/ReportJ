import { createElement, insertBefore } from "app/js/common/utils/html";

import JiraDialogObserver from "app/js/common/utils/html-observers/jiraDialogObserver";
import React from "react";
import { TemplateSelector } from "./components/templateSelector";
import { render } from "react-dom";

export class LogTemplatesExtender {
    constructor(storage, browser) {
        this.storage = storage;
        this.browser = browser;
    }

    start() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear((dialog) => {
            const comment = dialog.querySelector("#comment");
            const featureContainer = createElement(`<div class="reportj-feature reportj-block"></div>`);

            insertBefore(featureContainer, comment);
            render(<TemplateSelector
                storage={this.storage}
                browser={this.browser}
                onSubmit={(text) => this.addComment(text)} />, featureContainer);
        });
    }

    addComment(comment) {
        const commentArea = document.querySelector("#log-work-form #comment");

        let currentValue = commentArea.value || "";
        currentValue = currentValue.trim();

        commentArea.value = `${currentValue}\n${comment}`;
    }
}
