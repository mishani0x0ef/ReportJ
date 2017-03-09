jiraReporterApp.service('repositoryService', function ($q, $http) {
    var config = new AppConfig();
    var baseApiUrl = config.urls.reportjApiUrl;
    var defaultCommitsCount = 10;

    this.checkConnection = function () {
        var apiUrl = baseApiUrl + "gitCommits",
            deferred = $q.defer();

        $http.get(apiUrl, {
            params: {
                repoUrl: "test",
                username: "test"
            }
        }).catch(function (e) {
            var response = e.data,
                responseValid = response && response.Status && response.Status === 2;

            deferred.resolve(responseValid);
        });

        return deferred.promise;
    }

    this.checkRepo = function (repository, handler) {
        var apiUrl = baseApiUrl + repository.type + "Commits";

        // todo: handle response message properly. MR
        $http({
            method: "GET",
            url: apiUrl,
            params: {
                username: repository.userName,
                repoUrl: repository.url,
                count: 1
            }
        }).success(function () {
            handler(true);
        }).error(function () {
            handler(false);
        });
    };

    this.getLastCommits = function (repository, handler) {
        var apiUrl = baseApiUrl + repository.type + "Commits";

        // todo: parse response message properly. MR
        $http({
            method: "GET",
            url: apiUrl,
            params: {
                username: repository.userName,
                repoUrl: repository.url,
                count: defaultCommitsCount
            }
        }).success(function (data, status, headers, config) {
            handler(data);
        }).error(function (data, status, headers, config) {
            var msg = "Oops! Something went wrong while getting your commits for '" + repository.name + "' repository.";
            bootbox.alert(msg, "Warning!");
            handler();
        });
    };
});