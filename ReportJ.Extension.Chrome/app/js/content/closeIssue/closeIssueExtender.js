import $ from "jquery";
import ElementObserver from "~/js/util/elementObserver";
import JiraWrapper from "~/js/services/jira";
import UrlService from "~/js/services/urlService";

export default class CloseIssueExtender {
    constructor(browser) {
        this.browser = browser;
        this._initService();
    }

    start() {
        const baseUrl = this.urlService.getBaseUrl(location.href);
        this.jira.checkIsInsideJira(baseUrl)
            .then((inJira) => {
                if (inJira) {
                    this._initCloseDialogObserver();
                }
            });
    }

    _initService() {
        this.urlService = new UrlService(this.browser);
        const baseUrl = this.urlService.getBaseUrl(location.href);
        this.jira = new JiraWrapper(baseUrl);
    }

    _initCloseDialogObserver() {
        const observer = new ElementObserver(".jira-dialog-content-ready");
        observer.onAppear(($dialog) => {
            // todo: check is it "Close Dialog". Currently it could be any other dialog. MR
            const customCloseExist = $dialog.has(".reportj-close-button").length > 0;
            if (customCloseExist) {
                return;
            }

            const $container = $dialog.find(".form-footer .buttons");
            const $button = $("<div class='reportj-close-button aui-button'>Close with ReportJ</div>");
            $container.prepend($button);

            $button.click(() => this._resetRemaining());
        });
    }

    _resetRemaining() {
        const url = location.href;
        this.jira.setRemainingEstimate(url, "0m")
            .then(() => {
                // trigger default close to submit issue. MR
                const $closeBtn = $("#issue-workflow-transition-submit");
                $closeBtn.trigger("click");
            });
    }
}