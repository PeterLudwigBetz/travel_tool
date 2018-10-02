import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import { NewAccommodationForm } from '../../components/Forms';
import AccommodationPanelHeader from '../../components/AccommodationPanelHeader';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { createAccommodation } from '../../redux/actionCreator/accommodationAction';

export class Accommodation extends Component {
  
  renderAccommodationPanelHeader() {
    const { openModal } = this.props;
    return (
      <div className="rp-role__header">
        <AccommodationPanelHeader openModal={openModal} />
      </div>
    );
  }


  renderAccommodationForm() {
    const { closeModal, shouldOpen, modalType, createAccommodation } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        width="800px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title="Add Guest House"
      >
        <NewAccommodationForm
          closeModal={closeModal}
          createAccommodation={createAccommodation}
        />
      </Modal>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderAccommodationForm()}
        {this.renderAccommodationPanelHeader() }
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, user }) => ({
  ...user,
  ...modal.modal,
});

const actionCreators = {
  openModal,
  closeModal,
  createAccommodation
};

Accommodation.propTypes = {
  history: PropTypes.shape({}).isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  createAccommodation: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
};

Accommodation.defaultProps = {
  modalType: ''
}

export default connect(mapStateToProps, actionCreators)(Accommodation);

