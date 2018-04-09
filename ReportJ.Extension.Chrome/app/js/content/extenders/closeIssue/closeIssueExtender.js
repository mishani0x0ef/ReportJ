import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import JiraWrapper from "~/js/services/jira";
import { createElement } from "~/js/util/html";

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