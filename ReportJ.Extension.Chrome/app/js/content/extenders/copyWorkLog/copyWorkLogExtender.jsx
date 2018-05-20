import { createElement, insertAfter } from "~/js/util/html";

import ElementObserver from "~/js/util/ElementObserver";
import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import { isEmpty } from "~/js/util/object";

export class CopyWorkLogExtender {
    start() {
        this._initWorkLogsInsideContainer(document);
        // BUG: observer don't see changes if "Work Log" tab is opened and log was added or removed.
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
        button.addEventListener("click", (e) => this._copyWorkLog(e.currentTarget.parentElement));

        insertAfter(button, container);
    }

    _copyWorkLog(container) {
        const durationContainer = container.querySelector(".worklog-duration");
        const commentContainer = container.querySelector(".worklog-comment");

        const duration = this._parseDuration(durationContainer.innerHTML);
        const comment = this._parseComment(commentContainer.innerHTML);

        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear((dialog) => {
            const timeInput = dialog.querySelector("#log-work-time-logged");
            const commentInput = dialog.querySelector("#comment");

            timeInput.value = duration;
            commentInput.value = comment;

            observer.dispose();
        });

        const logWorkTrigger = document.querySelector(".issueaction-log-work");

        if (logWorkTrigger) {
            logWorkTrigger.click();
        } else {
            observer.dispose();
        }
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
            // remove 'a' tag and live only text inside (e.g `<a href="any">TEXT</a>` -> `TEXT`)
            .replace(/<a[^>]*>/g, "")
            .replace(/<\/a>/g, "")
            // remove extra new lines
            .split("\n")
            .map((part) => part.trim())
            .filter((part) => !isEmpty(part))
            .join("\n")
            .trim();
    }
}