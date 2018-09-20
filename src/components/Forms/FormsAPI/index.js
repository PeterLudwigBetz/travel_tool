import React, {Component} from 'react';
import Input from './Input';
import FormContext from './FormContext/FormContext';

class InputRenderer {
  constructor(props, formMetadata) {
    this.formMetadata = formMetadata;
    this.props = props;
  }

  switchProps(name, type, values, inputProps) {

    switch (type) {
    case 'dropdown-select':
      inputProps.choices = this.formMetadata.dropdownSelectOptions[name];
      return inputProps;
    case 'button-toggler':
      inputProps.choices = this.formMetadata.buttonToggleOptions[name];
      return inputProps;
    case 'date':
      inputProps.selectedDate = values[name];
      return inputProps;
    default:
      return inputProps;
    }
  }

  renderInput = (name, type, customProps) => {
    const { values, onChange, value} = this.props;

    let inputProps = {
      value: values[name],
      name: name,
      type: type,
      label: this.formMetadata.inputLabels[name].label,
      labelNote: this.formMetadata.inputLabels[name].note,
      onChange: onChange,
      ...customProps
    };

    customProps ? inputProps['data-parentid'] = customProps.parentid : null;
    inputProps = this.switchProps(name, type, values, inputProps);

    return createInput(inputProps);
  }
}

const createInput = props => <Input {...props} />;

export {Input, FormContext};
export default InputRenderer;
