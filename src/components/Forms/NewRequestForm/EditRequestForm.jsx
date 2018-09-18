import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
import { FormContext } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
// import TravelDetailsFieldset from './FormFieldsets/TravelDetails';
import EditInputFieldSet from './FormFieldsets/EditInputFieldSet';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewRequestForm.scss';

class EditRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    const { request } = this.props; 
    console.log(request);

    this.defaultState = {
      values: {
        name: request.name, // FIX: need to be refactor later
        gender: request.gender,
        department: request.department,
        role: request.role,
        manager: request.manager,
      },
      trips: request.trips,
      errors: {},
      hasBlankFields: true,
      checkBox: 'notClicked',
      selection: 'return',
      collapse: false,
      title: 'Hide Details',
      position: 'none',
      line: '1px solid #E4E4E4',
      parentIds: 1
    };
    this.state = { ...this.defaultState };
  }

  componentDidMount() {
    // console.log(this.props);
  }
 
  componentWillUnmount() {
    this.handleClearForm();
  }
  // an onChange handler will be created by the Input component when it's rendered
  

  handleSubmit = event => {
    event.preventDefault();
    const { handleEditRequest } = this.props;
    const { values } = this.state;
    const checkBoxState = localStorage.getItem('state');
    if (checkBoxState === 'clicked'){
      const [name, gender, department, role, manager] = [values.name, values.gender, values.department, values.role, values.manager];
      this.savePersonalDetails(name,gender,department,role,manager);
    }
    if (this.validate()) {
      // call create the request
      let data = { ...values };
      if (data.destination === 'Other') {
        data.destination = data.otherDestination;
      }
      delete data.otherDestination;
      handleEditRequest('vLT9a_VEr', data);
    }
  };
   handleClearForm = () => {
     this.setState({ ...this.defaultState });
   };
   validate = field => {
     let { values, errors } = this.state;
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
   
   render() {
     const { values, errors, hasBlankFields, selection, parentIds, trips } = this.state;
     const { managers, creatingRequest, request, } = this.props;
     const { id } = request;
     //  console.log(id);
     return (
       <FormContext targetForm={this} errors={errors} validatorName="validate">
         {creatingRequest && (
           <h5 style={{display: 'flex', justifyContent: 'center', fontFamily: 'DIN Pro'}}>
          Creating request...
           </h5>
         )}
         <form onSubmit={this.handleSubmit} className="new-request">
           <PersonalDetailsFieldset values={values} managers={managers} />
           {trips.map(id => (
             <EditInputFieldSet
               key={trips.id} 
               values={values}
               value="232px" 
               selection={selection}
               handleDate={this.onChangeDate}
               handleChange={this.handleRadioButton}
               onChangeInput={this.onChangeInput}
               parentIds={parentIds}
               addNewTrip={this.addNewTrip}
               removeTrip={this.removeTrip} 
             />
           ))}
           <hr />
           <Script url={process.env.REACT_APP_CITY} />   
           <SubmitArea
             onCancel={this.handleClearForm}
             hasBlankFields={hasBlankFields}
             send="Update Request"
           />
         </form>
       </FormContext>
     );
   }
}
EditRequestForm.propTypes = {
  handleEditRequest: PropTypes.func.isRequired,
  managers: PropTypes.array,
  creatingRequest: PropTypes.bool,
};
EditRequestForm.defaultProps = {
  creatingRequest: false,
  managers: []
};
export default EditRequestForm;

