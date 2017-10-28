import JiraDialogObserver from "~/js/util/jiraDialogObserver";

export default class AutoIssueSummaryExtender {
    constructor(browser) {
        this.browser = browser;
        this._initService();
    }

    start() {
        //this._initLogWorkDialogObserver();
    }

    _initLogWorkDialogObserver() {
        const observer = new JiraDialogObserver(".jira-dialog-content-ready", "close issue");
        observer.onAppear(($dialog) => {
            const customCloseExist = $dialog.has(".reportj-close-button").length > 0;
            if (customCloseExist) {
                return;
            }

            this._addCloseBtn($dialog);
        });
    }
}