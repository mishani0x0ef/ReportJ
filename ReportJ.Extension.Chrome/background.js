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
        };

        chrome.tabs.getSelected(null, function (tab) {
            var baseUrl = urlService.getBaseUrl(tab.url);
            jira = new JiraWrapper(baseUrl);

            jira.getIssueInfo(
                tab.url,
                function (issueSummary, context) {
                    context.chrome.tabs.executeScript({
                        code: "document.activeElement.value = " + JSON.stringify(issueSummary) + " + document.activeElement.value"
                    })
                }, self);
        });
    }

    chrome.contextMenus.onClicked.addListener(contextMenuHandler);

}(chrome));