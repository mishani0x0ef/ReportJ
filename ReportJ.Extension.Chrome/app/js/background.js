import JiraWrapper from "./services/jira";
import UrlService from "./services/urlService";
import config from "~/config";
import { getRandomString } from "./util/string";

class BackgroundWorker {
    constructor(browser) {
        this.browser = browser;
        this.urlService = new UrlService(browser);

        this.initContextMenu();
        this.browser.contextMenus.onClicked.addListener(this.contextMenuHandler);
    }

    contextMenuHandler(e) {
        if (e.menuItemId !== self.contextMenuId) {
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

    initContextMenu() {
        const context = "editable";
        const title = config.app.name + " add issue summary";
        this.contextMenuId = this.browser.contextMenus.create({
            "title": title,
            "contexts": [context],
            "id": getRandomString()
        });
    }
}

export default new BackgroundWorker(chrome);