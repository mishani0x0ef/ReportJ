import { createElement, insertAfter } from "~/js/util/html";

import ElementObserver from "~/js/util/ElementObserver";

export class CopyWorkLogExtender {
    start() {
        this._initWorkLogsInsideContainer(document);
        const observer = new ElementObserver(".issuePanelContainer");
        observer.onAppear((panel) => this._initWorkLogsInsideContainer(panel));
    }

    _initWorkLogsInsideContainer(container) {
        const workLogs = container.querySelectorAll("div[id*='worklog']");
        workLogs.forEach((workLog) => this._addCopyButton(workLog));
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
        const comment = this._parseComment(commentContainer.innerHTML);

        console.log(`Time: ${duration}`);
        console.log(`Comment: ${comment}`);

        const logWorkTrigger = document.querySelector(".issueaction-log-work");
        logWorkTrigger.click();

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
            .replace(" minute", "m")
            .trim();
    }

    _parseComment(comment) {
        return comment
            .replace(/<br>/g, "")
            // remove 'a' tag and live only text inside 
            // <a href="any">TEXT</a> -> TEXT
            .replace(/<a[^>]*>/g, "")
            .replace(/<\/a>/g, "")
            .trim();
    }
}