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
            const $element = $(template).insertAfter($logTimeInput);
            this._initElement($element);
            this._addButtonHandlers($element);
        });
    }

    _initElement($element) {
        const $link = $element.find(".reportj-link");
        $link.click(() => this._showPopup());
        this._createTimeOptionsGroup(this.hours);
        this._createTimeOptionsGroup(this.minutes);
    }

    _addButtonHandlers($element) {
        const $okButton = $element.find("#reportj-submit-log-time");
        const $cancelButton = $element.find("#reportj-cancel-log-time");

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

    // todo: simplify element creation by using some simple UI framework. MR
    _createTimeOptionsGroup(timeOptions) {
        const group = timeOptions.group;
        const groupSelector = `input[name=${group}]`;

        const $elements = timeOptions.values.map((value) => {
            const inputId = `${group}_${value}`;
            const $input = $(`<input type="radio" id="${inputId}" name="${group}" value="${value}" />`);
            const $label = $(`<label for="${inputId}">${value}</label>`);
            const $template = $(`<div class="grid-cell"></div>`).append($input).append($label);

            return $template;
        });

        $(timeOptions.placeholder).append($elements);

        $(groupSelector).change((e) => {
            const $group = $(groupSelector).parent();
            const $container = $(e.target.parentElement);
            const activationClass = "active";
            const checked = e.target.checked;

            $group.removeClass(activationClass);

            if (checked) {
                $container.addClass(activationClass);
            }
        });
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