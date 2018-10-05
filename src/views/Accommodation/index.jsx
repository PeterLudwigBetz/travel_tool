import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import { NewAccommodationForm } from '../../components/Forms';
import AccommodationPanelHeader from '../../components/AccommodationPanelHeader';
import GuestHouseHeader from '../../components/AccommodationPanelHeader/EditAccommodation';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { createAccommodation, fetchAccommodation, editAccommodation } from '../../redux/actionCreator/accommodationActions';
import WithLoadingCentreGrid from '../../components/CentreGrid';

export class Accommodation extends Component {
  state = {
    guestHouseToEdit: {},
  }
  componentDidMount() {
    const { fetchAccommodation } = this.props;
    fetchAccommodation();
  }

  handleOnEdit = (guestHouse) => {
    let { openModal, modalType } = this.props;
    console.log(guestHouse)
    // editAccommodation(guestHouseId);
    this.setState({
      guestHouseToEdit: guestHouse
    })
    openModal(true, 'edit accomodation');
    // localStorage.setItem('modalType', 'edit accomodation');//////////
    // this.saveGuestHouseData(editAccommodations.accommodationData);
    console.log(modalType);
  }

  // saveGuestHouseData = (guestHousesData) => {
  //   localStorage.setItem('houseName', guestHousesData.houseName);
  //   localStorage.setItem('id', guestHousesData.id);
  //   localStorage.setItem('location', guestHousesData.location);
  //   localStorage.setItem('bathRooms', guestHousesData.bathRooms);
  //   localStorage.setItem('imageUrl', guestHousesData.imageUrl);
  //   localStorage.setItem('rooms', JSON.stringify(guestHousesData.rooms));
  // }
  
  renderAccommodationPanelHeader() {
    let { openModal } = this.props;
    return (
      <div className="rp-role__header">
        <AccommodationPanelHeader openModal={openModal} />
      </div>
    );
  }

  renderAccommodationForm() {
    const { closeModal, shouldOpen, modalType, guestHouses, createAccommodation, fetchAccommodation, editAccommodation } = this.props;
    const { guestHouseToEdit } = this.state;
    console.log(guestHouseToEdit);
    return (
      <Modal
        closeModal={closeModal}
        width="800px"
        visibility={(shouldOpen && (modalType === 'edit accomodation' || modalType === 'new model')) ? 'visible' : 'invisible'}
        title={modalType === 'edit accomodation' ? `Edit Guest House ${guestHouseToEdit.houseName}` : 'Add Guest House'}
      >
        <NewAccommodationForm
          closeModal={closeModal}
          modalType={modalType}
          createAccommodation={createAccommodation}
          fetchAccommodation={fetchAccommodation}
          guestHouseToEdit={guestHouseToEdit}
          editAccommodation={editAccommodation}
        />
      </Modal>
    );
  }

  render() {
    const { guestHouses, isLoading, accommodationError } = this.props;
    return (
      <Fragment>
        {this.renderAccommodationPanelHeader() }
        {this.renderAccommodationForm()}
        <div className="table__container">
          <WithLoadingCentreGrid
            handleOnEdit={this.handleOnEdit}
            guestHouses={guestHouses}
            isLoading={isLoading}
            error={accommodationError}
          />
        </div>
      </Fragment>
    );
  }
}

Accommodation.propTypes = {
  history: PropTypes.shape({}).isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  createAccommodation: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  guestHouses:  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    houseName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    bathRooms: PropTypes.number.isRequired
  })),
  isLoading: PropTypes.bool,
  accommodationError: PropTypes.string,
  fetchAccommodation: PropTypes.func.isRequired,
  // guestHouseToEdit: PropTypes.func.isRequired,
};

Accommodation.defaultProps = {
  guestHouses: [],
  accommodationError: '',
  isLoading: false
};

Accommodation.defaultProps = {
  modalType: '',
};


const actionCreators = {
  openModal,
  closeModal,
  fetchAccommodation,
  createAccommodation,
  editAccommodation
};

export const mapStateToProps = ({ accommodation, modal }) => ({
  ...accommodation,
  ...modal.modal,
});


export default connect(mapStateToProps, actionCreators)(Accommodation);
