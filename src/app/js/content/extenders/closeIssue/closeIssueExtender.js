import { eventCategory, visitor } from "app/js/common/services/analytics";

import JiraDialogObserver from "app/js/common/utils/html-observers/jiraDialogObserver";
import JiraWrapper from "app/js/common/services/jira";
import { createElement } from "app/js/common/utils/html";

export class CloseIssueExtender {
    constructor() {
        this.jira = new JiraWrapper();
    }

    start() {
        const observer = new JiraDialogObserver("Close Issue");
        observer.onAppear((dialog) => {
            this._addCloseBtn(dialog);
        });
    }

    _addCloseBtn(dialog) {
        const container = dialog.querySelector(".form-footer .buttons");
        const button = createElement("<div class='aui-button' title='Close issue and reset remaining estimate'>Close with <strong>ReportJ</strong></div>");

        container.prepend(button);
        button.addEventListener("click", (e) => this._closeIssueWithResetRemaining(e));
    }

    _closeIssueWithResetRemaining(e) {
        visitor.event(eventCategory.dialog, "close and reset estimate").send();

        const target = e.target;
        target.setAttribute("disabled", "disabled");

        const url = location.href;
        this.jira.setRemainingEstimate(url, "0m")
            .then(() => {
                // trigger default close to submit issue
                // don't used close over JIRA api because could be used custom submit JIRA workflow
                const closeBtn = document.getElementById("issue-workflow-transition-submit");
                closeBtn.click();

                // set timeout to let default submit finish it's work.
                setTimeout(() => target.removeAttribute("disabled"), 3000);
            });
    }
}