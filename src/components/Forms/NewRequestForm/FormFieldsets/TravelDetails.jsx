import React, { Component } from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import RadioButton from '../../../RadioButton';

class TravelDetailsFieldset extends Component {

  render() {
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;
    const { values, handleChange, onChange, selection } = this.props;
    // console.log('*********', this.props);
    const customPropsForDepartureDate = { minDate: moment() };
    const customPropsForArrivalDate = {
      disabled: !values.departureDate,
      minDate: moment(values.departureDate),
      placeholderText: !values.departureDate
        ? 'select depart date first'
        : 'select return date'
    };
    const renderInputGroup = (selection) => {
      const inputGroup = (
        <div className="input-group">
          <div className="rectangle">
            <div className="style-details">
              <div className="travel-to">
                {renderInput('destination', 'dropdown-select')}
              </div>
              <div className="travel-to">
                {renderInput('origin', 'dropdown-select')}
              </div>
              <div className="travel-to">
                {renderInput(
                  'departureDate',
                  'date',
                  customPropsForDepartureDate
                )}
              </div>
              { selection !== 'oneWay' ? renderInput('arrivalDate', 'date', customPropsForArrivalDate) : null}
            </div>
          </div>
        </div>
      );
      if (selection === 'multi'){
        return [inputGroup, inputGroup];
      }
      return [inputGroup];
    };
    return (
      <fieldset className="travel-details">
        <legend
          className="line" 
          style={{ marginBottom: '6px', borderBottom:  '1px solid #E4E4E4' }}>
        Travel Details
        </legend>
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
          />
          <RadioButton 
            name="Multi City Trip"
            value="multi"
            id="multi"
          />
        </div>
        {renderInputGroup(selection).map(element => element
        )}
      </fieldset>
    );
  }
}

TravelDetailsFieldset.propTypes = {
  values: PropTypes.object.isRequired
};

export default TravelDetailsFieldset;
