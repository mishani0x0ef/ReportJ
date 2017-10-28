import $ from "jquery";
import ElementObserver from "~/js/util/elementObserver";
import JiraWrapper from "~/js/services/jira";
import UrlService from "~/js/services/urlService";
import { isNil } from "~/js/util/object";

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
        const observer = new ElementObserver(".jira-dialog-content-ready");
        observer.onAppear(($dialog) => {
            if (!this._isCloseDialog($dialog)) {
                return;
            }

            const customCloseExist = $dialog.has(".reportj-close-button").length > 0;
            if (customCloseExist) {
                return;
            }

            this._addCloseBtn($dialog);
        });
    }

    _isCloseDialog($dialog) {
        const $heading = $dialog.find(".jira-dialog-heading h2");
        const title = $heading.attr("title");
        return !isNil(title) && title.toLowerCase().includes("close issue");
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