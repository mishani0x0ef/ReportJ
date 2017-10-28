import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import { isEmpty } from "~/js/util/object";

export default class AutoIssueSummaryExtender {
    constructor(browser) {
        this.browser = browser;
    }

    start() {
        this._initLogWorkObserver();
    }

    _initLogWorkObserver() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear(($dialog) => {
            const $comment = $dialog.find("#comment");
            this._addIssueSummaryIfEmpty($comment);
        });
    }

    _addIssueSummaryIfEmpty($input) {
        const currentValue = $input.text();
        if (isEmpty(currentValue)) {
            // todo: add issue summary. MR
            $input.text("Hello from ReportJ.");
        }
    }
}