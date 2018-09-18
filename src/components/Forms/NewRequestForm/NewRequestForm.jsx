import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
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
      },
      trips: [],
      errors: {},
      hasBlankFields: true,
      checkBox: 'notClicked',
      selection: 'return',
      collapse: false,
      title: 'Hide Details',
      position: 'none',
      line: '1px solid #E4E4E4'
    };
    this.state = { ...this.defaultState };
  }

  componentWillUnmount() {
    this.handleClearForm();
  }

  onChangeDate = (date, event) => {
    const { values, trips } = this.state;
    const dateFormat = date.format('YYYY-MM-DD');
    const dateWrapperId = event.nativeEvent.path[7].id;
    const dateName = dateWrapperId.split('_')[0];
    const getId = dateName.split('-')[1];
    if (trips[getId]){
      if (dateName.startsWith('departure')) {
        trips[getId].departureDate = dateFormat;
      } else if (dateName.startsWith('arrival')) {
        trips[getId].returnDate = dateFormat;
      }
    }else {
      trips.push({
        [dateName.split('-')[0]]: dateFormat
      });
    }
    this.setState({
      values: {
        ...values,
        [dateName]: date
      }
    });
  }

  onChangeInput = (event) => {
    const name = event.target.name;
    const getId = event.target.dataset.parentid;
    const { trips, values } = this.state;
    const options = {
      types: ['(cities)'],
    };
    const autocomplete = new google.maps.places.Autocomplete(event.target, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace().address_components;
      const places = place[0].long_name + ' ' + place[2].long_name;
      if (trips[getId]){
        if (name.startsWith('destination')) {
          trips[getId].destination = places;
        } else if (name.startsWith('origin')) {
          trips[getId].origin = places;
        }
      }else {
        trips.push({
          [name.split('-')[0]]: places
        });
      }
      this.setState({
        values: {
          ...values,
          [name] :  places
        }
      });
    });
  }
 
  onClickInput = (event) =>  {
    // console.log(this.props.selectedDate);
    // console.log(event.target);
    const name = event.target.name;
    const getId = event.target.dataset.parentid;
    // const { trips, values } = this.state;

    // if (trips[getId]){
    //   if (name.startsWith('destination')) {
    //     trips[getId].destination = places;
    //   } else if (name.startsWith('origin')) {
    //     trips[getId].origin = places;
    //   }
    // }else {
    //   const tripDetails = {
    //     origin: '',
    //     destination: '',
    //     departureDate: '',
    //     returnDate:'',
    //   };
    //   trips.push({
    //     ...tripDetails,
    //     [name.split('-')[0]]: places
    //   });
    // }
    // this.setState({
    //   values: {
    //     ...values,
    //     [name] :  places
    //   }
    // });
  }
 

  handleRadioButton = (event) => {
    const { selection, collapse } = this.state;
    this.setState({
      selection: event.target.value,
      hasBlankFields: true, 
    });
    if (event.target.value === 'multi' && !collapse) {
      this.collapsible();
    }else if (!collapse) {
      return;
    }else{
      this.collapsible();
    }
  }


  handleSubmit = event => {
    event.preventDefault();
    const { handleCreateRequest } = this.props;
    const { values, selection, trips } = this.state;
    const newData = {
      name: values.name,
      tripType: selection,
      manager: values.manager,
      gender: values.gender,
      trips: trips,
      department: values.department,
      role: values.role
    };
    console.log(newData);
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

      // if (data.tripType === 'oneWay') {
      //   delete data.trips[0].returnDate;
      // }
      handleCreateRequest(data);
    }
  };

  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };

  hasBlankTrips = () => {
    let { trips } = this.state;
    const blank = trips.map(trip => {
      console.log(trip);
      return Object.keys(trip).some(key => !trip[key]);
    });
    return blank;
  }

  validate = field => {
    let { values, errors, selection, trips } = this.state;
    console.log('validate values', values);
    // if (selection === 'oneWay') {
    //   delete values.arrivalDate;
    // }

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

  collapsible =  () => {
    const { collapse } = this.state;
    if(!collapse) {
      this.setState({ 
        collapse: true,
        title: 'Show Details',
        position: 'rotate(266deg)',
        line: 'none'
      });
    }else{
      this.setState({ 
        collapse: false,
        title: 'Hide Details',
        position: 'none',
        line: '1px solid #E4E4E4'
      });
    }
  }



  savePersonalDetails(name, gender, department, role, manager) {
    // save to localstorage
    localStorage.setItem('name', name);
    localStorage.setItem('gender', gender);
    localStorage.setItem('department', department);
    localStorage.setItem('role', role);
    localStorage.setItem('manager', manager);
  }

  renderForm = (managers, creatingRequest) => {
    const { values, errors, hasBlankFields, selection,  collapse, title, position, line } = this.state;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        {creatingRequest && (
          <h5 className="style-h5">
         Creating request...
          </h5>
        )}
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFieldset
            values={values}
            collapsible={this.collapsible}
            collapse={collapse}
            title={title}
            position={position}
            line={line}
            managers={managers}
            value="232px"
          />
          <TravelDetailsFieldset 
            values={values} 
            value="232px" 
            selection={selection}
            handleDate={this.onChangeDate}
            handleDateBox={this.onChangeDateBox}
            handleChange={this.handleRadioButton}
            onChangeInput={this.onChangeInput}
            onClickInput={this.onClickInput}
          />
          <Script url={process.env.REACT_APP_CITY} />   
          <SubmitArea
            onCancel={this.handleClearForm}
            hasBlankFields={hasBlankFields}
            send="Send Request"
          />
        </form>
      </FormContext>
    );
  }
  

  render() {
    const { managers, creatingRequest } = this.props;
    return (
      <div>
        {this.renderForm(managers, creatingRequest)}
      </div>
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
