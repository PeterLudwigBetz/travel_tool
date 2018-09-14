import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import expand from '../../../../images/expand_more_24px.svg';
import Checkbox from '../../../CheckBox/index';

class PersonalDetailsFieldset extends Component {
  state = {
    collapse: false,
    title: 'Hide Details',
    position: 'none',
    line: '1px solid #E4E4E4'
  }

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

 
  render() {
    const { managers } = this.props;
    const { collapse, title, position, line } = this.state;
    const managerNames = managers.map(manager => manager.fullName);
    formMetadata.dropdownSelectOptions.manager = managerNames;

    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="personal-details">
        <legend style={{ width: '100%' , borderBottom: line }}>
          Personal Details
          <span className="required-field">
          * Required Field
          </span>
          <span
            className="hide-details" 
            onClick={this.collapsible} 
            onKeyPress={this.handleKeyDown} 
            role="button" 
            tabIndex={0}
          >
            <img src={expand} alt="clicked" className="expand" style={{transform: position }} />
            { title }
          </span>
        </legend>
        { !collapse ?
          ( 
            <div>
              <div className="input-group">
                <div className="spaces">
                  {renderInput('name', 'text')}
                </div>
                <div className="spaces">
                  {renderInput('gender', 'button-toggler')}
                </div>
                {renderInput('department', 'dropdown-select')}
              </div>
              <div className="input-group">
                <div className="spaces">
                  {renderInput('role', 'dropdown-select')}
                </div>
                {renderInput('manager', 'dropdown-select')}
              </div>
              <div className="input-group">
                <Checkbox />
              </div>
            </div>
          )  : null
        }
      </fieldset>
    );
  }
}

PersonalDetailsFieldset.propTypes = {
  managers: PropTypes.array
};

PersonalDetailsFieldset.defaultProps = {
  managers: []
};

export default PersonalDetailsFieldset;
