import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import React from "react";
import { TemplateSelector } from "./components/templateSelector";
import { render } from "react-dom";

export class LogTemplatesExtender {
    start() {
        this._initLogWorkObserver();
    }

    addComment(comment) {
        const commentArea = document.querySelector("#log-work #comment");

        let currentValue = commentArea.value || "";
        currentValue = currentValue.trim();

        commentArea.value = `${currentValue}\n${comment}`;
    }

    _initLogWorkObserver() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear(($dialog) => {
            const comment = $dialog[0].querySelector("#comment");

            const featureContainer = document.createElement("div");
            featureContainer.className = "reportj-feature reportj-block";

            comment.parentNode.insertBefore(featureContainer, comment);

            render(<TemplateSelector onSubmit={(text) => this.addComment(text)} />, featureContainer);
        });
    }
}