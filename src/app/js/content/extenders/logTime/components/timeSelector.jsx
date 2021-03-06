import { JiraButton, JiraCancelButton } from "app/js/content/components/button/button";
import { Popup, PopupButtonsSection, PopupSection } from "app/js/content/components/popup/popup";
import React, { Component } from "react";
import { eventCategory, visitor } from "app/js/common/services/analytics";

import { ProductPlacement } from "app/js/common/components/productPlacement/productPlacement";
import PropTypes from "prop-types";
import { SquareCheckBoxGroup } from "./squareCheckBoxGroup";
import { callIfExist } from "app/js/common/utils/function";
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
        visitor.event(eventCategory.dialog, "open time selector").send();
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