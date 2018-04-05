import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import JiraWrapper from "~/js/services/jira";
import UrlService from "~/js/services/urlService";
import { isEmpty } from "~/js/util/object";

export class AutoIssueSummaryExtender {
    constructor(browser) {
        this.urlService = new UrlService(browser);
        const baseUrl = this.urlService.getBaseUrl(location.href);
        this.jira = new JiraWrapper(baseUrl);
    }

    start() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear((dialog) => {
            const comment = dialog.querySelector("#comment");
            this._addIssueSummaryIfEmpty(comment);
        });
    }

    _addIssueSummaryIfEmpty(input) {
        const currentValue = input.value;
        if (isEmpty(currentValue)) {
            this.jira.getIssueInfo(location.href)
                .then((summary) => { input.value = summary; });
        }
    }
}