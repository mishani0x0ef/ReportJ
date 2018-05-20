import { createElement, insertAfter } from "~/js/util/html";

import ElementObserver from "~/js/util/ElementObserver";
import React from "react";
import { render } from "react-dom";

export class CopyWorkLogExtender {
    start() {
        const selector = "div[id*='worklog']";

        const initialWorkLogs = document.querySelectorAll(selector);
        initialWorkLogs.forEach((workLog) => this._addCopyButton(workLog));

        const observer = new ElementObserver(selector);
        observer.onAppear((workLog) => this._addCopyButton(workLog));
    }

    _addCopyButton(element) {
        element.style.color = "red";
    }
}