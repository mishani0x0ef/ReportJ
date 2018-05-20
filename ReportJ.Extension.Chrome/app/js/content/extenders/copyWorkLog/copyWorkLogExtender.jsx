import { createElement, insertAfter } from "~/js/util/html";

import ElementObserver from "~/js/util/ElementObserver";

export class CopyWorkLogExtender {
    start() {
        const selector = "div[id*='worklog']";

        const initialWorkLogs = document.querySelectorAll(selector);
        initialWorkLogs.forEach((workLog) => this._addCopyButton(workLog));

        const observer = new ElementObserver(".issuePanelContainer");
        observer.onAppear((panel) => {
            const workLogs = panel.querySelectorAll(selector);
            workLogs.forEach((workLog) => this._addCopyButton(workLog));
        });
    }

    _addCopyButton(element) {
        const container = element.querySelector(".actionContainer");

        const button = createElement("<div class='aui-button'>Copy with <strong>ReportJ</strong></div>");
        button.addEventListener("click", (e) => this._copyWorkLog(e));

        insertAfter(button, container);
    }

    _copyWorkLog(element) {
        console.log("Copy worklog");
    }
}