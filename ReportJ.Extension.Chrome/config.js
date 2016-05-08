var AppConfig = function () {

    var self = this;

    self.app = {
        name: "ReportJ",
        description: "The reporting helper for JIRA system.",
        version: "v2.2",
        homePage: "https://github.com/mishani0x0ef/reportj",
        feedbackPage: "https://docs.google.com/forms/d/1x3dH1dE1GtiwZO8lsT8YNthr4d1R_8pZsU2Om1aBLLw/viewform?usp=send_form"
    };
    Object.freeze(self.app);

    self.author = {
        email: "mishani0x0ef@gmail.com"
    };
    Object.freeze(self.author);

    self.urls = {
        versionControllApiUrl: "http://localhost/reportj/"
    };
    Object.freeze(self.urls);

    self.security = {
        rsaPublicKey: "-----BEGIN PUBLIC KEY-----" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq0kafzTlVWiWi7DZt0ZL" +
            "gwqd0ywNru2lELcNMgTkCvmTq+mVJRxDBie8BzhthRAN1YWNdqppjNCcLS6v8eVb" +
            "IKeyz3N00psgNJilKOU5LVsJhffECp7AKWLoowk3bI7WBhXI5Wc3Gj6S5nQJi1YB" +
            "LbR8Pcsbin894JqgeJ9mEqNxzhcq8fjNf7IiSbq8wUmhVSItEMSlmlql+E+KGFf+" +
            "ICnQAUMqpheAfyfT4w+DAoa1Kat9frv4tKSzEbky0d0UUja7KxwKIAAtL+n2topR" +
            "rY7VGiGgZqkI5Np+vc1ytYxYHS7Agk3Vzo/I6oUYlDDhS0rM1bpHo/nYC6dO1A8n" +
            "2QIDAQAB" +
            "-----END PUBLIC KEY-----"
    };
    Object.freeze(self.security);
}