import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { FormContext } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import TravelDetailsFieldset from './FormFieldsets/TravelDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewRequestForm.scss';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('name');
    const gender = localStorage.getItem('gender');
    const department = localStorage.getItem('department');
    const role = localStorage.getItem('role');
    const manager = localStorage.getItem('manager');

    this.defaultState = {
      values: {
        name: user ? user : '', // FIX: need to be refactor later
        gender: gender ? gender : '',
        department: department ? department : '',
        role: role ? role : '',
        manager: manager ? manager : '',
        origin: '',
        destination: '',
        otherDestination: '',
        departureDate: null,
        arrivalDate: null,
      },
      errors: {},
      hasBlankFields: true,
      checkBox: 'notClicked',
      selection: ''
    };
    this.state = { ...this.defaultState };
  }

  componentWillUnmount() {
    this.handleClearForm();
  }

  handleRadioButton = (event) => {
    this.setState({
      selection: event.target.value,
      hasBlankFields: true
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { handleCreateRequest } = this.props;
    const { values, selection } = this.state;
    const newData = {
      name: values.name,
      tripType: selection,
      manager: values.manager,
      gender: values.gender,
      trips: [
        {
          origin: values.origin,
          destination: values.destination,
          departureDate: values.departureDate,
          returnDate: values.arrivalDate,
        }
      ],
      department: values.department,
      role: values.role
    };
    const checkBoxState = localStorage.getItem('state');
    if (checkBoxState === 'clicked') {
      const [name, gender, department, role, manager] = [
        values.name,
        values.gender,
        values.department,
        values.role,
        values.manager
      ];
      this.savePersonalDetails(name, gender, department, role, manager);
    }
    if (this.validate()) {
      // call create the request
      let data = { ...newData };

      if (data.tripType === 'oneWay') {
        delete data.trips[0].returnDate;
      }
      handleCreateRequest(data);
    }
  };

  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };

  validate = field => {
    let { values, errors, selection } = this.state;
    if (selection === 'oneWay') {
      delete values.arrivalDate;
    }

    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;

    // check if to enforce otherDestination
    const requireOtherDestination = values.destination === 'Other';
    if (!requireOtherDestination) delete values['otherDestination'];

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

  savePersonalDetails(name, gender, department, role, manager) {
    // save to localstorage
    localStorage.setItem('name', name);
    localStorage.setItem('gender', gender);
    localStorage.setItem('department', department);
    localStorage.setItem('role', role);
    localStorage.setItem('manager', manager);
  }
  

  render() {
    const { values, errors, hasBlankFields, selection } = this.state;
    const { managers, creatingRequest } = this.props;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        {creatingRequest && (
          <h5
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontFamily: 'DIN Pro'
            }}
          >
            Creating request...
          </h5>
        )}
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFieldset
            values={values}
            managers={managers}
            value="232px"
          />
          <TravelDetailsFieldset 
            values={values} 
            value="190px" 
            selection={selection}
            handleChange={this.handleRadioButton}
            onChange={(targetForm) => console.log(targetForm)}
          />
          <SubmitArea
            onCancel={this.handleClearForm}
            hasBlankFields={hasBlankFields}
            send="Send Request"
          />
        </form>
      </FormContext>
    );
  }
}

NewRequestForm.propTypes = {
  handleCreateRequest: PropTypes.func.isRequired,
  managers: PropTypes.array,
  creatingRequest: PropTypes.bool
};

NewRequestForm.defaultProps = {
  creatingRequest: false,
  managers: []
};

export default NewRequestForm;
