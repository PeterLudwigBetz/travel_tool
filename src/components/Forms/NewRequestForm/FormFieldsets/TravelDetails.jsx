import React, { Component } from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import RadioButton from '../../../RadioButton';
import location from '../../../../images/location.svg';

class TravelDetailsFieldset extends Component {

  state = {
    parentIds: []
  }


  componentWillMount=() => {
    this.setState({
      parentIds: 2
    });
  }

  componentDidMount = () => {
    this.get_details();
  }


  get_details = () => {
    const { parentIds } = this.state;
    for (let i = 0; i < parentIds; i += 1) {
      const id = document.getElementById(i);
    }
  }

  customPropsForArrival = (values, name) => {
    return {
      disabled: !values[name],
      minDate: moment(values[name]),
      placeholderText: !values[name]
        ? 'select depart date first'
        : 'select return date'
    };
  }

  renderRadioButton = (handleChange) => {
    return (
      <div className="trip-align" onChange={handleChange}>
        <RadioButton 
          name="One Way Trip"
          value="oneWay"
          id="oneWay"
        />
        <RadioButton 
          name="Return Trip"
          value="return"
          id="return"
          defaultChecked="defaultChecked"
        />
        <RadioButton 
          name="Multi City Trip"
          value="multi"
          id="multi"
        />
      </div>
    );
  }


  renderTravelDetails = (i, selection, onChangeInput) => {
    const { values,  handleDate } = this.props;
    const { renderInput } = this.inputRenderer;
    const customPropsForDepartureDate = { minDate: moment() };

    return (
      <div className="input-group">
        <div className="rectangle">
          <div className="style-details">
            <div className="travel-to" onChange={onChangeInput}>
              {renderInput(`destination-${i}`, 'text', {parentid: i})}
              <img src={location} alt="icn" className="location-icon"  />
            </div>

            <div className="travel-to" onChange={onChangeInput}>
              {renderInput(`origin-${i}`, 'text', {parentid: i})}
              <img src={location} alt="icn" className="location-icon" />
            </div>

            <div className="others-width">
              {renderInput(
                `departureDate-${i}`,
                'date',
                {...customPropsForDepartureDate, parentid: i,  handleDate}
              )}
            </div>
            { selection !== 'oneWay' ? renderInput(`arrivalDate-${i}`, 'date', {...this.customPropsForArrival(values, `departureDate-${i}`), parentid: i, handleDate}) : null}
          </div>

        </div>
      </div>
    );
  } 


  renderForms(parentIds, selection, onChangeInput) {
    const forms = [];
    for (let i = 0; i < parentIds; i += 1) {
      forms.push(
        <div id={i} key={i}>
          {this.renderTravelDetails(i, selection, onChangeInput)}
        </div>
      );
    }
    return forms;
  }

  render() {
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { handleChange, selection, onChangeInput} = this.props;
  
    const { parentIds } = this.state;
    return (
      <fieldset className="travel-details">
        <legend
          className="line" 
          style={{ marginBottom: '6px', borderBottom:  '1px solid #E4E4E4' }}>
        Travel Details
        </legend>
        {this.renderRadioButton(handleChange)}
        {this.renderForms(parentIds, selection, onChangeInput)}
      </fieldset>
    );
  }
}

const values = PropTypes.object;
const handleChange = PropTypes.func;
const selection = PropTypes.string;
const onChangeInput = PropTypes.func;

TravelDetailsFieldset.propTypes = {
  values: values.isRequired,
  handleChange: handleChange.isRequired,
  selection: selection.isRequired,
  onChangeInput: onChangeInput.isRequired,
};

export default TravelDetailsFieldset;
