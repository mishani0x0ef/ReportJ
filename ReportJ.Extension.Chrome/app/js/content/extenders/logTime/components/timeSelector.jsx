import { JiraButton, JiraCancelButton } from "~/js/content/common/components/button/button";
import { Popup, PopupButtonsSection, PopupSection } from "~/js/content/common/components/popup/popup";
import React, { Component } from "react";

import { ProductPlacement } from "~/js/content/common/components/productPlacement/productPlacement";
import PropTypes from "prop-types";
import { SquareCheckBoxGroup } from "./squareCheckBoxGroup";
import { callIfExist } from "~/js/util/function";
import onClickOutside from "react-onclickoutside";

class TimeSelectorComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopupVisible: false,
        };

        this.selectedHours = null;
        this.selectedMinutes = null;
    }

    get selectedTime() {
        const hours = this.selectedHours || "";
        const minutes = this.selectedMinutes || "";
        const logTime = `${hours} ${minutes}`;
        return logTime.trim();
    }

    showPopup() {
        this.setState({ isPopupVisible: true });
    }

    closePopup() {
        this.setState({ isPopupVisible: false });
    }

    onHoursChange(hours) {
        this.selectedHours = hours;
    }

    onMinutesChange(minutes) {
        this.selectedMinutes = minutes;
    }

    submitChanges() {
        callIfExist(this.props.onSubmit, [this.selectedTime]);
        this.closePopup();
    }

    render() {
        return (
            <div className="time-selector">
                <span className="reportj-link" title="Use ReportJ to set time" onClick={() => this.showPopup()}></span>
                <Popup visible={this.state.isPopupVisible}>
                    <PopupSection>
                        <SquareCheckBoxGroup group="Hours" values={this.props.hours} onChange={(e) => this.onHoursChange(e)} />
                    </PopupSection>
                    <PopupSection>
                        <SquareCheckBoxGroup group="Minutes" values={this.props.minutes} onChange={(e) => this.onMinutesChange(e)} />
                    </PopupSection>
                    <PopupButtonsSection>
                        <ProductPlacement />
                        <JiraButton text="OK" onClick={() => this.submitChanges()} />
                        <JiraCancelButton text="Cancel" onClick={() => this.closePopup()} />
                    </PopupButtonsSection>
                </Popup>
            </div>
        );
    }
}

TimeSelectorComponent.propTypes = {
    hours: PropTypes.array.isRequired,
    minutes: PropTypes.array.isRequired,
    onSubmit: PropTypes.func,
}

export const TimeSelector = onClickOutside(TimeSelectorComponent, {
    handleClickOutside: function (instance) {
        return () => instance.closePopup();
    }
});