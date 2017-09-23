(function (chrome) {
    var self = this;
    var config = new AppConfig();
    var urlService = new UrlService();

    var initContextMenu = function () {
        var context = "editable";
        var title = config.app.name + " add issue summary";
        self.contextMenuId = chrome.contextMenus.create({
            "title": title,
            "contexts": [context],
            "id": "context" + context
        });
    }
    initContextMenu();

    var contextMenuHandler = function (e) {
        if (e.menuItemId !== self.contextMenuId) {
            return;
        }

        chrome.tabs.getSelected(null, (tab) => {
            const baseUrl = urlService.getBaseUrl(tab.url);
            const jira = new JiraWrapper(baseUrl);

            jira.getIssueInfo(tab.url)
                .then((summary) => {
                    const issueSummary = JSON.stringify(summary);
                    const code = `document.activeElement.value = ${issueSummary} + document.activeElement.value`;
                    chrome.tabs.executeScript({ code });
                });
        });
    }

    chrome.contextMenus.onClicked.addListener(contextMenuHandler);

}(chrome));