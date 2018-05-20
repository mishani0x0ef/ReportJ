import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import JiraWrapper from "~/js/services/jira";
import { isEmpty } from "~/js/util/object";

export class AutoIssueSummaryExtender {
    constructor() {
        this.jira = new JiraWrapper();
    }

    start() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear((dialog) => {
            const comment = dialog.querySelector("#comment");
            this._addIssueSummaryIfEmpty(comment);
        });
    }

    _addIssueSummaryIfEmpty(input) {
        this.jira.getIssueInfo(location.href)
            .then((summary) => {
                const currentValue = input.value;
                if (isEmpty(currentValue)) {
                    input.value = summary;
                }
            });
    }
}