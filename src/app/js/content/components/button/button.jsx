import PropTypes from "prop-types";
import React from "react";

export const JiraButton = ({ text, onClick }) => {
    return <input type="button" className="aui-button" value={text} onClick={() => onClick()} />;
}

JiraButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export const JiraCancelButton = ({ text, onClick }) => {
    return <a className="aui-button aui-button-link cancel" onClick={() => onClick()}>{text}</a>;
}

JiraCancelButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}