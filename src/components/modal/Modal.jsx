import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import {Link} from 'react-router-dom';
import Overlay from './overlay/Overlay';
import closeButton from '../../images/icons/close.svg';
import './_modal.scss';


class Modal extends PureComponent {
  static propTypes = {
    visibility: PropTypes.oneOf(['visible', 'invisible']).isRequired,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    modalId: PropTypes.string,
    modalContentId: PropTypes.string,
    modalBar: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired,
    width: PropTypes.string,
  };

  renderModalHeader = () => {
    const { title, closeModal, symbol, description, modalBar, divClass, dynamicText, params } = this.props;
    let url = location.pathname;
    if(params){
      let urlArr = params.split('/');
      url = urlArr.slice(0, urlArr.length-1).join('/');
    }
    return (
      <div className="modal-title-bar">
        <div className="modal-title-text">
          <div>
            {title}
          </div>
          <div className="lable-text modal-bar">
            {modalBar}
          </div>
        </div>
        <Link to={url}>
          <button type="button" onClick={closeModal} className="modal-close">
            <img alt="close" src={closeButton} />
          </button>

        </Link>
      </div>
    );
  };

  render() {
    const {
      children,
      visibility,
      closeModal,
      title,
      modalId,
      modalContentId,
      params
    } = this.props;
    
    let url = location.pathname;
    if(params){
      let urlArr = params.split('/');
      url = urlArr.slice(0, urlArr.length-1).join('/');
    }
    const {children, visibility, closeModal, divClass, innerClass, dynamicText,
      nextClass, dynamicDate, title, width  } = this.props;
    return (
      visibility === 'visible' ? (
        <Fragment>
          <Overlay className={visibility}>
            <div
              className={`modal ${visibility}`}
              style={{maxWidth: width}}
              onClick={e => {e.stopPropagation();}} onKeyPress={() => {}}
              id={modalId}
              tabIndex="0"
              role="button">
              {this.renderModalHeader()}
              <div className="modal-content" id={modalContentId}>
                {children}
              </div>
            </div>
          </Overlay>
        </Fragment>
      ) : null
    );
  }
}

Modal.propTypes = {
  params: PropTypes.string,
  description: PropTypes.string
};


Modal.defaultProps = {
  title: '',
  modalId: '',
  modalContentId: '',
  params: '',
  description: '',
  modalBar: <div />,
  closeModal: null,
  width: ''
};

export default Modal;
