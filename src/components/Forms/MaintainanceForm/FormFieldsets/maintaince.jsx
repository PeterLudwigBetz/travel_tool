import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/MaintanceFormMetadata';

class MaintainanceFieldSets extends Component {
  render() {
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;
    const { hasBlankFields } = this.props;

    return (
      <fieldset className="maintainance-details">
        <span>
          Mark Ndovu unavailable
        </span>
        <div className="input-group profile-input">
          {renderInput('maintainceStart', 'date')}
          {renderInput('maintainceEnd', 'date')}
          {renderInput('reason', 'text')}
        </div>
        <span>
          This room will be unavailable for booking by guests
        </span>
      </fieldset>
    );
  }
}
MaintainanceFieldSets.propTypes = {
  hasBlankFields: PropTypes.bool.isRequired,
};
MaintainanceFieldSets.defaultProps = {
};

export default MaintainanceFieldSets;
