import "./logTimeExtender.scss";

import $ from "jquery";
import JiraDialogObserver from "~/js/util/jiraDialogObserver";
import React from "react";
import { TimeSelector } from "./components/timeSelector";
import { render } from "react-dom";

export class LogTimeExtender {
    constructor() {
        this.hours = ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"];
        this.minutes = ["0m", "15m", "30m", "45m"];
    }

    start() {
        this._initLogWorkObserver();
    }

    _initLogWorkObserver() {
        const observer = new JiraDialogObserver("Log Work");

        observer.onAppear(($dialog) => {
            const $logTimeInput = $dialog.find("#log-work-time-logged");
            const $component = $("<reportj-log-time></reportj-log-time>").insertAfter($logTimeInput);

            render(<TimeSelector hours={this.hours} minutes={this.minutes} onSubmit={(time) => this._setLogTimeToJira(time)} />,
                $component[0]);
        });
    }

    _setLogTimeToJira(time) {
        const $timeInput = $("#log-work-time-logged");
        $timeInput.val(time);
    }
}