jiraReporterApp.controller('OptionsController', function ($scope) {
    
    $scope.svnRepositories = [
        { 
            Name: "Awersome application repository",
            Url: "http://repository.address/folder",
            UserName: "Mark.Commit",
            Password: "secret word"
        },
        { 
            Name: "Repository for very important things",
            Url: "http://svn.imporant-things/",
            UserName: "Mark.Commit",
            Password: "secret word"
        }
    ];
    
    $scope.addSvnRepository = function () {
        
    };
});