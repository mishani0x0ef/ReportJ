if (typeof JSEncrypt === "undefined") {
    throw Error("encryptService require JSEncrypt library. Visit https://github.com/travist/jsencrypt");
}

jiraReporterApp.service('encryptService', function ($q) {
    var self = this;
    var config = new AppConfig();
    var publicKey = config.security.rsaPublicKey;

    this.encrypt = function (target) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        var encrypted = encrypt.encrypt(target);
        return encrypted;
    };
});