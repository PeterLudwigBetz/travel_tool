import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import ChecklistFieldSet from './FormFieldSets';
import { closeModal } from '../../../redux/actionCreator/modalActions';

export default class NewChecklistForm extends PureComponent {
  constructor(props) {
    super(props);
    // const defaultResource = this.defaultResource[0];
    this.defaultState = {
      values: {
        itemName: '',
        label: '',
        link: '',
        requiresFiles: 'false',
        // ...defaultResource
      },
      // resources: [{}],
      errors: {},
      hasBlankFields: true
    };
  
    this.state = { ...this.defaultState };
  }

  componentWillUnmount() {
    this.handleCancel();
    const { fetchTravelChecklist } = this.props;
    const adminLocation = 'lagos';
    fetchTravelChecklist(null, adminLocation);
    // fetch checklist items
  }

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };

  handleSubmit = event => {
    event.preventDefault();
    const { createTravelChecklist } = this.props;
    const { values } = this.state;
    if (this.validate()) {
      let data = values;
      createTravelChecklist(data);
    }
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    !values[field]
      ? (errors[field] = 'This field is required')
      : (errors[field] = '');

    hasBlankFields = Object.keys(values).some(key => !values[key]);
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          <ChecklistFieldSet
            values={values}
            value="232px"
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <hr />
          <SubmitArea
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send="Add Item"
            cancel="Cancel"
          />
        </form>
      </FormContext>
    );
  }
}

NewChecklistForm.propTypes = {
  createTravelChecklist: PropTypes.func.isRequired,
  fetchTravelChecklist: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
