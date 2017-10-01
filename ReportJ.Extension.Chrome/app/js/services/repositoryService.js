import config from "~/config";
import reportjApp from "~/js/app";

reportjApp.service('repositoryService', function ($q, $http) {
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
        }).catch((e) => {
            var response = e.data,
                responseValid = response && response.Status && response.Status === 2;

            deferred.resolve(responseValid);
        });

        return deferred.promise;
    }

    this.check = function (repository) {
        var apiUrl = baseApiUrl + repository.type + "Commits";

        return $http.get(apiUrl, {
            params: {
                username: repository.userName,
                repoUrl: repository.url,
                count: 1
            }
        });
    };

    this.getLastCommits = function (repository) {
        var apiUrl = baseApiUrl + repository.type + "Commits";

        return $http.get(apiUrl, {
            params: {
                username: repository.userName,
                repoUrl: repository.url,
                count: defaultCommitsCount
            }
        }).then((e) => {
            var response = e.data,
                success = response && response.Status === 1;

            if (success) {
                return response.Message;
            }

            return $q.deferred().reject().promise();
        });
    };
});