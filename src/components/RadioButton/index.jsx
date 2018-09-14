import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './RaidoButton.scss';

class RadioButton extends PureComponent {

  render() {
    const  { name, value, id } = this.props;
    return (
      <ul style={{ padding: '0' }}>
        <li className="box-li">
          <input
            type="radio"
            id={id}
            value={value}
            name="selector"
          />
          <label htmlFor={id}>
            {name}
          </label>
          <div className="check" />
        </li>
      </ul>
    );
  }
}

RadioButton.prototypes = {
  name: PropTypes.string.isRequired,
  value:  PropTypes.string.isRequired,
  id:  PropTypes.string.isRequired,
};


export default RadioButton;
