import { createElement, insertAfter } from "app/js/common/utils/html";
import { eventCategory, visitor } from "app/js/common/services/analytics";

import ElementObserver from "app/js/common/utils/html-observers/elementObserver";
import JiraDialogObserver from "app/js/common/utils/html-observers/jiraDialogObserver";
import { isEmpty } from "app/js/common/utils/object";

export class CopyWorkLogExtender {
    start() {
        this._initCopyButtons(document);
        const observer = new ElementObserver(".issuePanelContainer");
        observer.onAppear((panel) => this._initCopyButtons(panel));

        const deleteObserver = new JiraDialogObserver("Delete Worklog");
        deleteObserver.onAppear((dialog) => {
            const submitButton = dialog.querySelector("#delete-log-work-submit");
            this._reinitCopyButtonsAfterSubmit(submitButton);
        })
    }

    _initCopyButtons(container) {
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
        visitor.event(eventCategory.dialog, "copy log").send();

        const durationContainer = container.querySelector(".worklog-duration");
        const commentContainer = container.querySelector(".worklog-comment");

        const duration = this._parseDuration(durationContainer.innerHTML);
        const comment = this._parseComment(commentContainer.innerHTML);

        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear((dialog) => {
            const timeInput = dialog.querySelector('input[name="timeLogged"]');
            const commentInput = dialog.querySelector("#comment");

            timeInput.value = duration;
            commentInput.value = comment;

            const submitButton = dialog.querySelector("#log-work-form-submit");
            this._reinitCopyButtonsAfterSubmit(submitButton);

            observer.dispose();
        });

        const logWorkTrigger = document.querySelector(".issueaction-log-work");

        if (logWorkTrigger) {
            logWorkTrigger.click();
        } else {
            observer.dispose();
        }
    }

    _reinitCopyButtonsAfterSubmit(submitButton) {
        // Workaround. After update of work logs mutation didn't called. So have to recreate buttons manually.
        submitButton.addEventListener("click", () => {
            setTimeout(() => this._initCopyButtons(document.body), 3000);
        });
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
