import { createElement, insertBefore } from "~/js/util/html";

import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import React from "react";
import { TemplateSelector } from "./components/templateSelector";
import { render } from "react-dom";

export class LogTemplatesExtender {
    start() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear((dialog) => {
            const comment = dialog.querySelector("#comment");
            const featureContainer = createElement(`<div class="reportj-feature reportj-block"></div>`);

            insertBefore(featureContainer, comment);
            render(<TemplateSelector onSubmit={(text) => this.addComment(text)} />, featureContainer);
        });
    }

    addComment(comment) {
        const commentArea = document.querySelector("#log-work #comment");

        let currentValue = commentArea.value || "";
        currentValue = currentValue.trim();

        commentArea.value = `${currentValue}\n${comment}`;
    }
}