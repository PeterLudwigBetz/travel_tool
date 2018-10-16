import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';

class PersonalDetailsFiedset extends Component {
  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const { roleName, centers } = this.props;
    const centerLocations = centers && centers.map(center => center.location);
    formMetadata.dropdownSelectOptions.center = centerLocations;

    return (
      <fieldset className="personal-details">
        <div>
          <div style={{ paddingTop: '14px' }}>
            {renderInput('email', 'text')}
          </div>
          <div>
            {
              centers &&
                renderInput('center', 'dropdown-select')
            }
          </div>
          <div>
            {
              !roleName &&
              renderInput('roleName', 'dropdown-select')
            }
          </div>
        </div>
      </fieldset>
    );
  }
}

export default PersonalDetailsFiedset;
