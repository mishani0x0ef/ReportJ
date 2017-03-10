jiraReporterApp.controller('OptionsController', function ($scope, $interval, $timeout, storageService, repositoryService) {

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

    var setValidity = function (baseObject, validationObject, message, concatErrorMsgWithExisting) {;
        if (validationObject === true) {
            if (concatErrorMsgWithExisting) {
                baseObject.$errorMessage += " " + message;
            } else {
                baseObject.$errorMessage = message;
            }
        } else {
            baseObject.$errorMessage = concatErrorMsgWithExisting ? baseObject.$errorMessage : "";
        }
    }

    var saveRepository = function (repository) {
        if (typeof (repository.repositoryId) === "undefined") {
            var ids = $scope.repositories.map((r) => { return r.repositoryId; });
            repository.repositoryId = Math.max(...ids) + 1;
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

    $scope.config = new AppConfig();

    $scope.maxRepoQuota = 2;
    $scope.repoApiAvailable = false;
    $scope.repositories = [];

    $scope.maxTemplateQuota = 10;
    $scope.templates = [];

    // Wathcers

    $scope.$watchCollection('templates', function (newTemplates, oldTemplates) {
        $scope.isMaxTemplatesCountExceed = newTemplates.length >= $scope.maxTemplateQuota;
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

    $scope.$watch('templateForm.description.$invalid', function (newValid, oldValid) {
        var baseObj = $scope.templateForm.description;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Description is required.", true);
    });

    // Handlers

    $scope.setLoading = function (isLoading, operationDescription) {
        $scope.loading = {
            inProgress: isLoading,
            description: operationDescription
        };
    }

    $scope.editRepository = function (repo, type) {
        $scope.repoForm.$setPristine(true);
        $scope.editedRepository = repo
            ? angular.copy(repo)
            : { type: type };

        // delay added to prevent from blinking errors on form in case if they was on form before cleaning with $setPristine(true). MR
        $timeout(function () {
            $("#repositoryEditModal").modal("show")
        }, 100);
    };

    $scope.saveRepository = function (repo) {
        $scope.setLoading(true, "Checking settings on our servers ...")
        repositoryService.check(repo)
            .then(function () {
                saveRepository(repo);
            })
            .catch(function () {
                bootbox.confirm(
                    "We wasn't able to establish connection using repository settings that you have defined. Save it anyway?",
                    "Connection problem!",
                    function (confirmed) {
                        if (confirmed) {
                            saveRepository(repo);
                        }
                    }
                );
            })
            .finally(function () {
                $scope.setLoading(false);
            });
    };

    $scope.removeRepository = function (repo) {
        var message = "Are you sure you want to delete this amazing repository '" + repo.name + "'?";
        bootbox.confirm(message, "Delete confirmation", function (confirmed) {
            if (!confirmed) return;

            $scope.repositories = $scope.repositories.filter((r) => { return r !== repo });
            $scope.saveSettings();
        });
    };

    $scope.editTemplate = function (template) {
        $scope.templateForm.$setPristine(true);

        $scope.editedTemplate = template ? angular.copy(template) : {};

        // delay added to prevent from blinking errors on form in case if they was on form before cleaning with $setPristine(true). MR
        $timeout(function () {
            $("#templateEditModal").modal("show")
        }, 100);
    }

    $scope.saveTemplate = function (template) {
        if (typeof (template.templateId) === "undefined") {
            var ids = $scope.templates.map((t) => { return t.templateId; });
            template.templateId = Math.max(...ids) + 1;
            $scope.templates.push(template);
        } else {
            angular.forEach($scope.templates, function (templ) {
                if (templ.templateId === template.templateId) {
                    angular.copy(template, templ);
                }
            });
        }

        $("#templateEditModal").modal("hide");
        $scope.saveSettings();
    };

    $scope.removeTemplate = function (template) {
        var message = "Are you sure you want to delete such a wonderful template?";
        bootbox.confirm(message, "Delete confirmation", function (confirmed) {
            if (!confirmed) return;

            $scope.templates = $scope.templates.filter((t) => { return t !== template });
            $scope.saveSettings();
        });
    };

    $scope.saveSettings = function () {
        var settings = {
            templates: $scope.templates,
            repositories: $scope.repositories,
        };
        storageService.saveSettings(settings, function (isSuccess) {
            var message = isSuccess ? "Options saved" : "Saving failed";
            showNotification(isSuccess, message);
            $scope.$apply();
        });
    };

    this.initialize = function () {
        repositoryService.checkConnection()
            .then((established) => { $scope.repoApiAvailable = established; })
            .catch(() => { $scope.repoApiAvailable = false; });

        storageService.getRepositories(function (repos) {
            angular.copy(repos, $scope.repositories);
            $scope.$apply();
        });
        storageService.getTemplates(function (templates) {
            angular.copy(templates, $scope.templates);
            $scope.$apply();
        });
    }

    this.initialize();
});