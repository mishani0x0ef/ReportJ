import "bootstrap";

import $ from "jquery";
import GeneralSettings from "~/js/models/settings/generalSettings";
import angular from "angular";
import config from "~/config";
import { confirm } from "~/js/util/dialog";

export default function OptionsController($scope, $interval, $timeout, storageService, repositoryService) {

    // Private handlers

    var showNotification = function (isSuccess, message) {
        $scope.isNoticaitionSuccess = isSuccess;
        $scope.notificationMessage = message;
        $scope.notify = true;

        $timeout(() => { $scope.notify = false }, 2000);
    };

    var setInitialValidity = function (validationObject) {
        validationObject.$dirtyInvalid = validationObject.$invalid && validationObject.$dirty;
        validationObject.$errorMessage = "";
    }

    var setValidity = function (baseObject, validationObject, message, concatErrorMsgWithExisting) {
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
            const ids = $scope.repositories.map((r) => r.repositoryId);
            repository.repositoryId = Math.max(...ids) + 1;
            $scope.repositories.push(repository);
        } else {
            angular.forEach($scope.repositories, (repo) => {
                if (repo.repositoryId === repository.repositoryId) {
                    angular.copy(repository, repo);
                }
            });
        }

        $("#repositoryEditModal").modal("hide");
        $scope.saveSettings();
    }

    $scope.config = config;

    $scope.generalSettings = new GeneralSettings();

    $scope.maxRepoQuota = 2;
    $scope.repoApiAvailable = false;
    $scope.repositories = [];

    $scope.maxTemplateQuota = 10;
    $scope.templates = [];

    // Wathcers

    $scope.$watchCollection('templates', (newTemplates) => {
        $scope.isMaxTemplatesCountExceed = newTemplates.length >= $scope.maxTemplateQuota;
    });

    $scope.$watch('repoForm.name.$invalid', () => {
        const baseObj = $scope.repoForm.name;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Repository name is required.");
    });

    $scope.$watch('repoForm.url.$invalid', () => {
        const baseObj = $scope.repoForm.url;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "Repository URL is required.");
    });

    $scope.$watch('repoForm.username.$invalid', () => {
        const baseObj = $scope.repoForm.username;
        setInitialValidity(baseObj);
        setValidity(baseObj, baseObj.$error.required, "User Name is required.");
    });

    $scope.$watch('templateForm.description.$invalid', () => {
        const baseObj = $scope.templateForm.description;
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
        $scope.editedRepository = repo ? angular.copy(repo) : { type };

        // delay added to prevent from blinking errors on form in case if they was on form before cleaning with $setPristine(true). MR
        $timeout(() => { $("#repositoryEditModal").modal("show") }, 100);
    };

    $scope.saveRepository = function (repo) {
        $scope.setLoading(true, "Checking settings on our servers ...");
        repositoryService.check(repo)
            .then(() => saveRepository(repo))
            .catch(() => {
                const message = "We wasn't able to establish connection using repository settings that you have defined. Save it anyway?";
                const caption = "Connection problem!";
                confirm(message, caption)
                    .then((confirmed) => {
                        if (confirmed) {
                            saveRepository(repo);
                        }
                    });
            })
            .finally(() => { $scope.setLoading(false); });
    };

    $scope.removeRepository = function (repo) {
        const message = `Are you sure you want to delete this amazing repository '${repo.name}'?`;
        confirm(message, "Delete confirmation")
            .then((confirmed) => {
                if (confirmed) {
                    $scope.repositories = $scope.repositories.filter((r) => r !== repo);
                    $scope.saveSettings();
                }
            });
    };

    $scope.editTemplate = function (template) {
        $scope.templateForm.$setPristine(true);

        $scope.editedTemplate = template ? angular.copy(template) : {};

        // delay added to prevent from blinking errors on form in case if they was on form before cleaning with $setPristine(true). MR
        $timeout(() => { $("#templateEditModal").modal("show") }, 100);
    }

    $scope.saveTemplate = function (template) {
        if (typeof (template.templateId) === "undefined") {
            var ids = $scope.templates.map((t) => t.templateId);
            template.templateId = Math.max(...ids) + 1;
            $scope.templates.push(template);
        } else {
            angular.forEach($scope.templates, (templ) => {
                if (templ.templateId === template.templateId) {
                    angular.copy(template, templ);
                }
            });
        }

        $("#templateEditModal").modal("hide");
        $scope.saveSettings();
    };

    $scope.removeTemplate = function (template) {
        const message = "Are you sure you want to delete such a wonderful template?";
        confirm(message, "Delete confirmation")
            .then((confirmed) => {
                if (confirmed) {
                    $scope.templates = $scope.templates.filter((t) => t !== template);
                    $scope.saveSettings();
                }
            });
    };

    $scope.saveSettings = function () {
        const settings = {
            general: $scope.generalSettings,
            templates: $scope.templates,
            repositories: $scope.repositories,
        };
        storageService.saveSettings(settings)
            .then(() => { return { isSuccess: true, message: "Options saved" }; })
            .catch(() => { return { isSuccess: false, message: "Saving failed" }; })
            .then((result) => {
                showNotification(result.isSuccess, result.message);
                $scope.$apply();
            });
    };

    this.initialize = function () {
        repositoryService.checkConnection()
            .then((established) => { $scope.repoApiAvailable = established; })
            .catch(() => { $scope.repoApiAvailable = false; });

        storageService.getGeneralSettings().then((settings) => {
            angular.copy(settings, $scope.generalSettings);
            $scope.$apply();
        });
        storageService.getRepositories().then((repos) => {
            angular.copy(repos, $scope.repositories);
            $scope.$apply();
        });
        storageService.getTemplates().then((templates) => {
            angular.copy(templates, $scope.templates);
            $scope.$apply();
        });
    }

    this.initialize();
}

OptionsController.$inject = ["$scope", "$interval", "$timeout", "storageService", "repositoryService"];