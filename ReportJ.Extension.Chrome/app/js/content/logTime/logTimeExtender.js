import "./logTimeExtender.scss";
import $ from "jquery";
import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import template from "./logTimeExtender.html";

export default class LogTimeExtender {
    constructor() {
        this.componentName = "reportj-log-time-extender";
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
        });
    }

    _initElement($element) {
        const $link = $element.find(".reportj-link");
        const hours = {
            group: "hours",
            placeholder: `${this.componentName} .hours`,
            values: ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"]
        };
        const minutes = {
            group: "minutes",
            placeholder: `${this.componentName} .minutes`,
            values: ["0m", "15m", "30m", "45m"]
        };

        $link.click(() => {
            const $logWorkPopup = $(`${this.componentName} .log-work-popup`);
            $logWorkPopup.addClass("active"); 
        });

        this._createTimeOptionsGroup(hours);
        this._createTimeOptionsGroup(minutes);
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
}