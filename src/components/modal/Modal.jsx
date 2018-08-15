import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Overlay from './overlay/Overlay';
import closeButton from '../../images/icons/close.svg';
import './_modal.scss';

class Modal extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired
  }
  render() {
    const {children, className, toggleModal, title} = this.props;

    return (
      <Fragment>
        <Overlay click={toggleModal} className={className} />
        <div className={`modal ${className}`}>
          <div className="modal-title-bar">
            <div className="modal-title-text">
              {title}
            </div>
            <button
              type="button"
              onClick={toggleModal}
              className="modal-close"
            >
              <img alt="close" src={closeButton} />
            </button>
          </div>
          <div className="modal-content">
            { children }
          </div>
          <hr />
        </div>
      </Fragment>
    );
  }
}

export default Modal;
