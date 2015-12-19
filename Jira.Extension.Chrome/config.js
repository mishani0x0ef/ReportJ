var AppConfig = function () {
    
    var self = this;

    self.urls = {
        jiraUrl: "https://jd.eleks.com",
        versionControllApiUrl: "http://ws-if-cp0565/Jira.Extension.RepositoryApi/"
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