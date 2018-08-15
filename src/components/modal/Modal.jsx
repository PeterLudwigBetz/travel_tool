import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Overlay from './overlay/Overlay';
import closeButton from '../../images/icons/close.svg';
import './_modal.scss';

class Modal extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    modalBar: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired
  };
  render() {
    const { children, className, toggleModal, title, symbol, description, modalBar} = this.props;

    return (
      <Fragment>
        <Overlay click={toggleModal} className={className} />
        <div className={`modal ${className}`}>
          <div className="modal-title-bar">
            <div className="modal-title-text">
              <span>
                {symbol}
              </span>
              <span>
                {title}
              </span>
              <span className="modal-title-id">
                {description}
              </span>
              <span>
                {modalBar}
              </span>
            </div>
            <button type="button" onClick={toggleModal} className="modal-close">
              <img alt="close" src={closeButton} />
            </button>
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Modal;
