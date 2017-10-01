import "bootstrap";
import PopupController from "./components/popupController";
import RepositoryService from "~/js/services/repositoryService";
import StarageService from "~/js/services/storageService";

import angular from "angular";

const reportjApp = angular.module("reportjPopupApp", [])
    .constant("browser", chrome)
    .service("repositoryService", RepositoryService)
    .service("storageService", StarageService)
    .controller("PopupController", PopupController);

export default reportjApp;