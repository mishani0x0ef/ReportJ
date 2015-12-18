jiraReporterApp.controller('OptionsController', function ($scope, $interval, $timeout, storageService, commitsService, encryptService) {

    // Private handlers

    var showNotification = function (isSuccess, message) {
        $scope.isNoticaitionSuccess = isSuccess;
        $scope.notificationMessage = message;
        $scope.notify = true;

        $timeout(function () {
            $scope.notify = false;
        }, 2000);
    };

    var setInitialValidity = function (validationObject) {
        validationObject.$dirtyInvalid = validationObject.$invalid && validationObject.$dirty;
        validationObject.$errorMessage = "";
    }

    var setValidity = function (baseObject, validationObject, errorValidationMessage, concatErrorMsgWithExisting) {;
        if (validationObject === true) {
            if (concatErrorMsgWithExisting) {
                baseObject.$errorMessage += " " + errorValidationMessage;
            } else {
                baseObject.$errorMessage = errorValidationMessage;
            }
        } else {
            baseObject.$errorMessage = concatErrorMsgWithExisting ? baseObject.$errorMessage : "";
        }
    }

    var saveRepository = function (repository) {
        if (repository.passChangeAllowed === true) {
            repository.password = encryptService.encrypt(repository.password);
            repository.passwordConfirm = repository.password;
        }
        repository.passChangeAllowed = false;

        if (typeof (repository.repositoryId) === "undefined") {
            var repoId = 0;
            angular.forEach($scope.repositories, function (repo) {
                if (repo.repositoryId > repoId) {
                    repoId = repo.repositoryId;
                }
            });
            repository.repositoryId = ++repoId;
            $scope.repositories.push(repository);
        } else {
            angular.forEach($scope.repositories, function (repo) {
                if (repo.repositoryId === repository.repositoryId) {
                    angular.copy(repository, repo);
                }
            });
        }

        $("#repositoryEditModal").modal("hide");
        $scope.saveSettings();
    }

    $scope.maxRepoQuota = 2;
    $scope.repositories = [];

    // Wathcers

    $scope.$watchCollection('repositories', function (newRepositories, oldRepositories) {
        var svnReposCount = 0,
            gitReposCount = 0;

        angular.forEach(newRepositories, function (repo) {
            switch (repo.type) {
            case "svn":
                svnReposCount++;
                break;
            case "git":
                gitReposCount++;
                break;
            default:
                break;
            }
        });

        $scope.isMaxSvnRepoCountExceed = svnReposCount >= $scope.maxRepoQuota;
        $scope.isMaxGitRepoCountExceed = gitReposCount >= $scope.maxRepoQuota;
    });

    $scope.$watch('repoForm.name.$invalid', function (newValid, oldValid) {
        var baseObj = $scope.repoForm.name;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Repository name is required.");
    });

    $scope.$watch('repoForm.url.$invalid', function (newValid, oldValid) {
        var baseObj = $scope.repoForm.url;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Repository URL is required.");
    });

    $scope.$watch('repoForm.username.$invalid', function (newValid, oldValid) {
        var baseObj = $scope.repoForm.username;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "User Name is required.");
    });

    $scope.$watch('repoForm.password.$invalid', function (newValid, oldValid) {
        var baseObj = $scope.repoForm.password;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Password is required.");
    });

    $scope.$watch('repoForm.password.$invalid', function (newValid, oldValid) {
        var baseObj = $scope.repoForm.password;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Password is required.", true);
        setValidity(baseObj, baseObj.$error.equals, "Password and confirmation should match each other.", true);
    });

    $scope.$watch('repoForm.passwordConfirm.$invalid', function (newValid, oldValid) {
        var baseObj = $scope.repoForm.passwordConfirm;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Confirmation is required.", true);
        setValidity(baseObj, baseObj.$error.equals, "Password and confirmation should match each other.", true);
    });

    // Handlers

    $scope.setLoading = function (isLoading, operationDescription) {
        $scope.loading = {};
        $scope.loading.inProgress = isLoading;
        $scope.loading.description = operationDescription;
    }

    $scope.editRepository = function (repository, repositoryType) {
        $scope.repoForm.$setPristine(true);
        if (typeof (repository) !== "undefined" && repository !== null) {
            // Exited repository. MR
            $scope.editedRepository = angular.copy(repository);
        } else {
            // New repository. MR
            $scope.editedRepository = {};
            $scope.editedRepository.type = repositoryType;
            $scope.editedRepository.passChangeAllowed = true;
        }

        // delay added to prevent from blinking errors on form in case if they was on form before cleaning with $setPristine(true). MR
        $timeout(function () {
            $("#repositoryEditModal").modal("show")
        }, 100);
    };

    $scope.enableRepoPassChange = function (repository) {
        repository.password = "";
        repository.passwordConfirm = "";
        repository.passChangeAllowed = true;
    }

    $scope.saveRepository = function (repository) {
        $scope.setLoading(true, "Checking settings on our servers ...")

        commitsService.checkConnection(
            repository,
            function (connectionEstablished) {
                $scope.setLoading(false);
                if (!connectionEstablished) {
                    bootbox.confirm(
                        "We wasn't able to establish connection using repository settings that you have defined. Save it anyway?",
                        "Connection problem!",
                        function (confirmed) {
                            if (confirmed) {
                                saveRepository(repository);
                            }
                        }
                    );
                } else {
                    saveRepository(repository);
                }
            },
            repository.passChangeAllowed);
    };

    $scope.removeRepository = function (repository) {
        var warningMessage = "Are you sure you want to delete that amazing repository '" + repository.name + "'?";
        bootbox.confirm(warningMessage, "Delete confirmation", function (confirmed) {
            if (!confirmed) {
                return;
            }
            var index = $scope.repositories.indexOf(repository);
            $scope.repositories.splice(index, 1);
            $scope.saveSettings();
        })
    };

    $scope.saveSettings = function () {
        storageService.saveRepositories($scope.repositories, function (isSuccess) {
            var message = isSuccess ? "Options saved" : "Saving failed";
            showNotification(isSuccess, message);
            $scope.$apply();
        });
    };

    $scope.getSettings = function () {
        storageService.getRepositories(function (repositories) {
            $scope.repositories = [];
            angular.forEach(repositories, function (repo) {
                $scope.repositories.push(repo);
                $scope.$apply();
            });
        });
    };
    $scope.getSettings();
});