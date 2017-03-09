var AppConfig = function () {

    var self = this;

    self.app = {
        name: "ReportJ",
        description: "The reporting helper for JIRA system.",
        version: "v2.3",
        homePage: "https://github.com/mishani0x0ef/reportj",
        feedbackPage: "https://docs.google.com/forms/d/1x3dH1dE1GtiwZO8lsT8YNthr4d1R_8pZsU2Om1aBLLw/viewform?usp=send_form"
    };
    Object.freeze(self.app);

    self.author = {
        email: "mishani0x0ef@gmail.com"
    };
    Object.freeze(self.author);

    self.urls = {
        reportjApiUrl: "http://localhost:1062/api/"
    };
    Object.freeze(self.urls);
}