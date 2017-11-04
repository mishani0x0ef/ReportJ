import "./logTimeExtender.scss";
import $ from "jquery";
import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import template from "./logTimeExtender.html";

export default class LogTimeExtender {
    start() {
        this._initLogWorkObserver();
    }

    _initLogWorkObserver() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear(($dialog) => {
            const $logTimeInput = $dialog.find("#log-work-time-logged");
            $(template).insertAfter($logTimeInput);
        });
    }
}