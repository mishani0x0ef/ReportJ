jiraReporterApp.service('commitsService', function ($q, $http) {
    var self = this;
    var baseApiUrl = "http://ws-if-cp0565/Jira.Extension.RepositoryApi/";
    var defaultCommitsCount = 10;

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
            //todo: provide error handling. MR
            alert("Oops! Something went wrong while getting your commits. ");
            console.error("Error while getting commits. Status: " + status);
        });
    };
});