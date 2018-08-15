import React from 'react';
import { PropTypes } from 'prop-types';
import './_overlay.scss';

const Overlay = (props) => {
  const {className, click} = props;
  return (
    <div
      role="button"
      tabIndex="0"
      onClick={click}
      onKeyPress={()=>{}}
      className={`overlay ${className}`}
    />
  );
};

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
};

export default Overlay;
