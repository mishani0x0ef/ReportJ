var UrlService = function UrlService() {
    var self = this;

    self.getCurrentBaseUrl = function (callback) {
        chrome.tabs.getSelected(null, function (tab) {
            if (callback) {
                var baseUrl = self.getBaseUrl(tab.url);
                callback(baseUrl);
            }
        });
    }

    self.getBaseUrl = function (url) {
        var urlComponents = url.split("/");
        var protocol = urlComponents[0];
        var host = urlComponents[2];
        var baseUrl = protocol + "//" + host;

        return baseUrl;
    }
}