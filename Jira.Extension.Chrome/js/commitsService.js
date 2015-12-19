jiraReporterApp.service('commitsService', function ($q, $http, encryptService) {
    var self = this;
    var config = new AppConfig();
    var baseApiUrl = config.urls.versionControllApiUrl;
    var defaultCommitsCount = 10;
    
    this.checkConnection = function(repository, resultHandler, encryptPassword){
        var apiUrl = baseApiUrl + repository.type + "/connection/test";
        
        var userName = repository.userName, 
            password = repository.password,
            url = repository.url;
        
        if(encryptPassword === true) {
            password = encryptService.encrypt(password);
        }
        
        $http({
            method: "GET",
            url: apiUrl,
            params: {
                username: userName,
                password: password,
                repo: url
            }
        }).success(function (data, status, headers, config) {
            resultHandler(data);
        }).error(function (data, status, headers, config) {
            console.error("Error while checking connection: " + status);
            resultHandler(false);
        });
    };

    this.getLastCommits = function (repository, handler) {
        var apiUrl = baseApiUrl + repository.type + "/commits";

        $http({
            method: "GET",
            url: apiUrl,
            params: {
                username: repository.userName,
                password: repository.password,
                repo: repository.url,
                count: defaultCommitsCount,
                author: repository.userName
            }
        }).success(function (data, status, headers, config) {
            handler(data);
        }).error(function (data, status, headers, config) {
            bootbox.alert("Oops! Something went wrong while getting your commits. ");
            console.error("Error while getting commits. Status: " + status);
            handler();
        });
    };
});