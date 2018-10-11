import OptionsController from "./controllers/optionsController";
import RepositoryService from "~/js/services/repositoryService";
import StarageService from "~/js/services/storageService";
import angular from "angular";
import diableValidation from "./directives/diableValidation";
import equalsDirective from "./directives/equalsDirective";

angular.module("reportjOptionsApp", [])
    .constant("browser", chrome)
    .directive("equals", equalsDirective)
    .directive("diableValidation", diableValidation)
    .service("repositoryService", RepositoryService)
    .service("storageService", StarageService)
    .controller("optionsController", OptionsController);