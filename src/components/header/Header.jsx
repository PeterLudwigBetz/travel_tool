import React, { PureComponent } from 'react';
import './_header.scss';

class Header extends PureComponent{
  render(){
    const { toggleNewRequestModal } = this.props;
    return(
      <div className="new-requests">
        <div>
          <span className="requests">
            REQUESTS
          </span>
        </div>

        <div>
          <button onClick={toggleNewRequestModal} type="button" className="btn-new-request">
            <span className="new-request-button-text">
                New Request
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
