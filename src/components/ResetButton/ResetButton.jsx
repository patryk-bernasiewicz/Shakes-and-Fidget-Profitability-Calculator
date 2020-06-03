import React from 'react';
import PropTypes from 'prop-types';
import './ResetButton.css';

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    Reset
  </button>
);

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ResetButton;