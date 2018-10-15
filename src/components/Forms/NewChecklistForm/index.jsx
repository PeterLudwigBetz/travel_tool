import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import ChecklistFieldSet from './FormFieldSets';

export default class NewChecklistForm extends PureComponent {
  constructor(props) {
    super(props);
    const { modalType, checklistItem } = this.props;
    // const defaultResource = this.defaultResource[0];
    const itemName = (modalType == 'edit cheklistItem' && checklistItem) ? checklistItem.name : '' ;
    const requiresFiles = (modalType == 'edit cheklistItem' && checklistItem) ? checklistItem.requiresFiles : '' ;
    const link = (modalType == 'edit cheklistItem' && checklistItem.resources[0])
      ? checklistItem.resources[0].link : '' ;
    const label = (modalType == 'edit cheklistItem' && checklistItem.resources[0])
      ? checklistItem.resources[0].label : '' ;

    this.defaultState = {
      values: {
        itemName,
        label,
        link,
        requiresFiles,
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

  closeEditModal = () => {
    let { closeModal } = this.props;
    closeModal(true, 'edit cheklistItem');
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      createTravelChecklist,
      updateTravelChecklist,
      checklistItem,
      modalType
    } = this.props;

    const { values } = this.state;
    const checklistItemData = {
      itemName: values.itemName,
      requiresFiles: values.requiresFiles,
      resources: [{
        link: values.link,
        label: values.label
      }]
    };

    if (this.validate() && modalType === 'edit cheklistItem') {
      let data = {checklistItemId: checklistItem.id, checklistItemData};
      updateTravelChecklist(data);
    } else {
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
    const { modalType } = this.props;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          <ChecklistFieldSet
            values={values}
            value="232px"
            handleCheckboxChange={this.handleCheckboxChange}
            modalType={modalType}
          />
          <hr />
          <SubmitArea
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send={modalType === 'edit cheklistItem' ? 'Save Item' : 'Add Item'}
            cancel="Cancel"
            modalType={modalType}
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
  updateTravelChecklist: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  checklistItem: PropTypes.object.isRequired
};

