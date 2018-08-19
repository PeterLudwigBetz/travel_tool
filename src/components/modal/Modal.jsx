import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Overlay from './overlay/Overlay';
import closeButton from '../../images/icons/close.svg';
import './_modal.scss';

class Modal extends PureComponent {
  static propTypes = {
    visibility: PropTypes.oneOf(['visible', 'invisible']).isRequired,
    toggleModal: PropTypes.func.isRequired,
    symbol: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    modalBar: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired
    
  };

  renderModalHeader = () => {
    const { title, toggleModal, symbol, description, modalBar} = this.props;
    return (
      <div className="modal-title-bar">
        <div className="modal-title-text">
          <div>
            {symbol}
          </div>
          <div>
            {title}
          </div>
          <div className="modal-title-id">
            {description}
          </div>
          <div className="lable-text modal-bar">
            {modalBar}
          </div>
        </div>
        <button type="button" onClick={toggleModal} className="modal-close">
          <img alt="close" src={closeButton} />
        </button>
      </div>
    );
  };

  render() {
    const { children, visibility, toggleModal, title } = this.props;
    return (
      <Fragment>
        <Overlay click={toggleModal} className={visibility}>
          <div
            className={`modal ${visibility}`}
            onClick={e => {
              e.stopPropagation();
            }}
            onKeyPress={() => {}}
            tabIndex="0"
            role="button"
          >
            {this.renderModalHeader()}
            <div className="modal-content">
              {children}
            </div>
          </div>
        </Overlay>
      </Fragment>
    );
  }
}

Modal.defaultProps = {
  symbol: '',
  title: '',
  description: '',
  modalBar: ''
};

export default Modal;
