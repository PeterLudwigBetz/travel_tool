import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer, { FormContext } from '../FormsAPI';
import MaintainanceFieldSets from './FormFieldsets/maintaince';
import Validator from '../../../validator';
import './maintainance.scss';

// TODO: Create your own meta data.
import * as formMetadata from '../FormsMetadata/NewProfileMetadata/index';


class MaintainceForm extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultState = {
      values: {
        reason: '',
        maintainceStart: '',
        maintainceEnd: ''
      },
      errors: {},
      hasBlankFields: true,
      hideNotificationPane: true,
      hideSideBar: false,
      openSearch: false,
      selectedLink: 'settings page',
      hideOverlay: false
    };
    this.state = { ...this.defaultState };
  }

  submitProfileForm = event => {
    event.preventDefault();
    const { values } = this.state;
    const {addMaintenenceRecord} = this.props;
    if (this.validate) {
      let data = { ...values };
      data.start = data.maintainceStart;
      data.end = data.maintainceEnd;
      console.log(data);
      addMaintenenceRecord(data, 'room-id-1');
    }
  };

  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;

    !values[field]
      ? (errors[field] = 'This field is required')
      : (errors[field] = '');

    // check if the form has any other blank fields
    // this will qualify the form as fully filled or not
    hasBlankFields = Object.keys(values).some(key => !values[key]);
    // update the form's validity and return a boolean to use on Submit
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });
    return !hasBlankFields;
  };


  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { managers } = this.props;

    return (
      <FormContext targetForm={this} validatorName="validate" errors={errors}>
        <form onSubmit={this.submitProfileForm} className="maintainance-form">
          <MaintainanceFieldSets values={values} hasBlankFields={hasBlankFields} />
          {hasBlankFields ? (
            <div>
              <button type="submit" disabled={hasBlankFields} className="bg-btn bg-btn--inactive">
                Save Changes
              </button>
            </div>) :
            (
              <div>
                <button type="submit" className="bg-btn bg-btn--active">
                Save Changes
                </button>
                <button type="button" className="bg-btn bg-btn--inactive" onClick={this.handleClearForm} id="btn-cancel">
                Cancel
                </button>
              </div>
            )}

        </form>
      </FormContext>
    );
  }
}

MaintainceForm.propTypes = {
  managers: PropTypes.array,
};
MaintainceForm.defaultProps = {
  managers: [],
};

export default MaintainceForm;
