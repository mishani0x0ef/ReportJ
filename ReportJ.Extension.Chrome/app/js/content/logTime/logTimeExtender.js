import "./logTimeExtender.scss";
import $ from "jquery";
import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import template from "./logTimeExtender.html";

export default class LogTimeExtender {
    constructor() {
        this.componentName = "reportj-log-time-extender";
        this.hours = {
            group: "hours",
            placeholder: `${this.componentName} .hours`,
            values: ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"]
        };
        this.minutes = {
            group: "minutes",
            placeholder: `${this.componentName} .minutes`,
            values: ["0m", "15m", "30m", "45m"]
        };
    }

    start() {
        this._initLogWorkObserver();
    }

    _initLogWorkObserver() {
        const observer = new JiraDialogObserver("Log Work");
        observer.onAppear(($dialog) => {
            const $logTimeInput = $dialog.find("#log-work-time-logged");
            const $component = $(template).insertAfter($logTimeInput);
            this._initComponentTemplate($component);
            this._addButtonHandlers($component);
        });
    }

    _initComponentTemplate($template) {
        const $link = $template.find(".reportj-link");
        $link.click(() => this._showPopup());
        this._createTimeOptionsGroup(this.hours);
        this._createTimeOptionsGroup(this.minutes);
    }

    _addButtonHandlers($template) {
        const $okButton = $template.find("#reportj-submit-log-time");
        const $cancelButton = $template.find("#reportj-cancel-log-time");

        $okButton.click(() => {
            const time = this._getLogTimeFromPopup();
            this._setLogTimeToJira(time);
            this._hidePopup();
        });

        $cancelButton.click(() => this._hidePopup());
    }

    _showPopup() {
        const $logWorkPopup = $(`${this.componentName} .log-work-popup`);
        $logWorkPopup.addClass("active");
    }

    _hidePopup() {
        const $logWorkPopup = $(`${this.componentName} .log-work-popup`);
        $logWorkPopup.removeClass("active");
    }

    _createTimeOptionsGroup(timeOptions) {
        const group = timeOptions.group;
        const groupSelector = `input[name=${group}]`;
        const $elements = timeOptions.values.map((value) => this._createTimeElement(group, value));

        $(timeOptions.placeholder).append($elements);
        $(groupSelector).change((e) => this._onSelctionChange(e));
    }

    _createTimeElement(group, value) {
        const inputId = `${group}_${value}`;
        return $(
            `<div class="grid-cell">
                <input type="radio" id="${inputId}" name="${group}" value="${value}" />
                <label for="${inputId}">${value}</label>
            </div>`
        );
    }

    _onSelctionChange(e) {
        const groupName = e.target.name;
        const groupSelector = `input[name=${groupName}]`;
        const $group = $(groupSelector).parent();
        const activationClass = "active";

        $group.removeClass(activationClass);

        if (e.target.checked) {
            const $targetContainer = $(e.target.parentElement);
            $targetContainer.addClass(activationClass);
        }
    }

    _getLogTimeFromPopup() {
        const hoursValue = $(`input[name=${this.hours.group}]:checked`).val() || "";
        const minutesValue = $(`input[name=${this.minutes.group}]:checked`).val() || "";
        const logTime = `${hoursValue} ${minutesValue}`;

        return logTime.trim();
    }

    _setLogTimeToJira(time) {
        const $timeInput = $("#log-work-time-logged");
        $timeInput.val(time);
    }
}