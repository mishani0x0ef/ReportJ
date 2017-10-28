import $ from "jquery";
import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import JiraWrapper from "~/js/services/jira";
import UrlService from "~/js/services/urlService";

export default class CloseIssueExtender {
    constructor(browser) {
        this.browser = browser;
        this._initService();
    }

    start() {
        this._initCloseDialogObserver();
    }

    _initService() {
        this.urlService = new UrlService(this.browser);
        const baseUrl = this.urlService.getBaseUrl(location.href);
        this.jira = new JiraWrapper(baseUrl);
    }

    _initCloseDialogObserver() {
        const observer = new JiraDialogObserver("Close Issue");
        observer.onAppear(($dialog) => {
            const customCloseExist = $dialog.has(".reportj-close-button").length > 0;
            if (!customCloseExist) {
                this._addCloseBtn($dialog);
            }
        });
    }

    _addCloseBtn($dialog) {
        const $container = $dialog.find(".form-footer .buttons");
        const $button = $("<div class='reportj-button reportj-close-button aui-button' title='Close issue and reset remaining estimate'>Close with <strong>ReportJ</strong></div>");
        $container.prepend($button);

        $button.click((e) => this._closeIssueWithResetRemaining(e));
    }

    _closeIssueWithResetRemaining(e) {
        const $target = $(e.target);
        $target.attr("disabled", "disabled");

        const url = location.href;
        this.jira.setRemainingEstimate(url, "0m")
            .then(() => {
                // trigger default close to submit issue
                // don't used close over JIRA api because could be used custom submit JIRA workflow
                const $closeBtn = $("#issue-workflow-transition-submit");
                $closeBtn.trigger("click");

                // set timeout to let default submit finish it's work.
                return new Promise((resolve) => setTimeout(() => resolve(), 3000));
            })
            .then(() => $target.removeAttr("disabled"))
            .catch(() => $target.removeAttr("disabled"));
    }
}