import "bootstrap";
import "~/css/main.css";
import "~/css/animation.css";
import "~/css/bootstrap.paper.css";
import PopupController from "./components/popupController";
import RepositoryService from "~/js/services/repositoryService";
import StarageService from "~/js/services/storageService";

import angular from "angular";

angular.module("reportjPopupApp", [])
    .constant("browser", chrome)
    .service("repositoryService", RepositoryService)
    .service("storageService", StarageService)
    .controller("PopupController", PopupController);