import JiraWrapper from "./services/jira";
import UrlService from "./services/urlService";
import config from "~/config";
import { getRandomString } from "./util/string";

class BackgroundWorker {
    constructor(browser) {
        this.browser = browser;
        this.browser.runtime.onInstalled.addListener((e) => this.onInstalled(e));
        this.urlService = new UrlService(browser);
    }

    onInstalled() {
        this.initContextMenu();
    }

    initContextMenu() {
        const context = "editable";
        const title = `${config.app.name} add issue summary`;
        this.menuItemId = this.browser.contextMenus.create({
            "title": title,
            "contexts": [context],
            "id": getRandomString(),
        });
        this.browser.contextMenus.onClicked.addListener((e) => this.onContextMenuClick(e));
    }

    onContextMenuClick(e) {
        if (e.menuItemId !== this.menuItemId) {
            return;
        }

        this.browser.tabs.getSelected(null, (tab) => {
            const baseUrl = this.urlService.getBaseUrl(tab.url);
            const jira = new JiraWrapper(baseUrl);

            jira.getIssueInfo(tab.url)
                .then((summary) => {
                    const issueSummary = JSON.stringify(summary);
                    const code = `document.activeElement.value = ${issueSummary} + document.activeElement.value`;
                    this.browser.tabs.executeScript({ code });
                });
        });
    }
}

export default new BackgroundWorker(chrome);