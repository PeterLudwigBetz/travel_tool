import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';
import tick from '../../images/Tick/tick.svg';

class Checkbox extends PureComponent{
  state = {
    checkBox: 'notClicked'
  }

  componentWillMount(){
    const state = localStorage.getItem('state');
    this.setState({checkBox:state});
  }

  clickCheckbox=()=>{
    let { checkBox } = this.state;
    if(checkBox=== 'notClicked'){
      this.setState({checkBox:'clicked'});
      checkBox = 'clicked';
    }
    else{
      this.setState({checkBox:'notClicked'});
      checkBox = 'notClicked';
    }
    this.renderCurrentState(checkBox);
  }

  renderCurrentState(state){
    localStorage.setItem('state', state);
  }

  renderCheckBox=()=>{
    const state = localStorage.getItem('state');
    let { checkBox } = this.state;
    let className = 'default';
    if(state==='clicked'){
      checkBox = state;
    }
    if (checkBox === 'clicked'){
      className = 'checkbox clicked';
    }
    else{
      className = 'checkbox default';
    }
    return(
      <div className={className} onClick={()=>{this.clickCheckbox();}} role="button" tabIndex="0" onKeyDown={()=>{this.clickCheckbox();}} id="checkBox">
        <img src={tick} alt="clicked" className="ticksvg" />
      </div>
    );
  }

  renderText=()=>{
    return(
      <p>
        Remember my personal details
      </p>
    );
  }

  render(){
    return(
      <div className="container">
        {this.renderCheckBox()}
        {this.renderText()}
      </div>
    );
  }
}


export default Checkbox;
