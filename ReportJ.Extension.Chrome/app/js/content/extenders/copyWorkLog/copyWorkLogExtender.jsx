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

    _copyWorkLog(event) {
        const container = event.currentTarget.parentElement;
        const timeContainer = container.querySelector(".worklog-duration");
        const commentContainer = container.querySelector(".worklog-comment");

        const duration = this._parseDuration(timeContainer.innerHTML);
        const rawComment = commentContainer.innerHTML;

        console.log(`Time: ${duration}`);
        console.log(`Comment: ${rawComment}`);

        const logWorkTrigger = document.querySelector(".issueaction-log-work");
        if (logWorkTrigger) {
            logWorkTrigger.click();
        }

        // TODO: insert duration and comment into dialog. MR
    }

    _parseDuration(duration) {
        return duration
            .replace(/,/g, "")
            .replace(" weeks", "w")
            .replace(" week", "w")
            .replace(" days", "d")
            .replace(" day", "d")
            .replace(" hours", "h")
            .replace(" hour", "h")
            .replace(" minutes", "m")
            .replace(" minute", "m");
    }
}