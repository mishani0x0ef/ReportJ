import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import React from "react";
import { TemplateSelector } from "./components/templateSelector";
import { render } from "react-dom";

export class LogTemplatesExtender {
    start() {
        this._initLogWorkObserver();
    }

    _initLogWorkObserver() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear(($dialog) => {
            const comment = $dialog[0].querySelector("#comment");

            const featureContainer = document.createElement("div");
            featureContainer.className = "reportj-feature reportj-block";

            comment.parentNode.insertBefore(featureContainer, comment);

            render(<TemplateSelector />, featureContainer);
        });
    }
}