import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import ChecklistPanelHeader from '../../components/ChecklistPanelHeader';
import {
  NewChecklistForm,
} from '../../components/Forms';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  createTravelChecklist,
  fetchTravelChecklist,
  updateTravelChecklist,
  deleteTravelChecklist
} from '../../redux/actionCreator/travelChecklistActions';
import './index.scss';
import error from '../../images/error.svg';


export class Checklist extends Component {
  state = {
    itemToEdit: null,
    deleteReason: '',
    checklistItemId: ''
  }

  componentDidMount() {
    const { fetchTravelChecklist, currentUser } = this.props;
    fetchTravelChecklist(null, currentUser.location);
  }

  setItemToDelete = (checklistItemId) => {
    const { openModal } = this.props;
    this.setState({ checklistItemId });
    openModal(true, 'delete checklist item');
  }

  openAddModal = () => {
    let { openModal } = this.props;
    openModal(true, 'add cheklistItem');
  }

  openEditModal = () => {
    let { openModal } = this.props;
    openModal(true, 'edit cheklistItem');
  }

  closeEditModal = () => {
    let { closeModal } = this.props;
    closeModal(true, 'edit cheklistItem');
  }

  handleEditItem = (checklistItem) => {
    this.setState(() => ({itemToEdit: checklistItem}));
    this.openEditModal();
  }

  handleInputChange = (event) => {
    this.setState({ deleteReason: event.target.value });
  }

  deleteChecklistItem = (event) => {
    event.preventDefault();
    const { deleteTravelChecklist } = this.props;
    const { checklistItemId } = this.state;
    deleteTravelChecklist(checklistItemId, this.state);
  }

  renderChecklistPanelHeader() {
    const { currentUser } = this.props;
    return (
      <div className="rp-role__header">
        <ChecklistPanelHeader openModal={this.openAddModal} location={currentUser.location} />
      </div>
    );
  }

  renderChecklistForm() {
    const { closeModal, shouldOpen, modalType, createTravelChecklist, updateTravelChecklist, currentUser, fetchTravelChecklist } = this.props;
    const { itemToEdit } = this.state;

    return (
      <Modal
        closeModal={closeModal}
        width="480px"
        visibility={
          shouldOpen && (modalType === 'edit cheklistItem' || modalType === 'add cheklistItem') ? 'visible' : 'invisible'
        }
        title={`${modalType === 'edit cheklistItem' ? 'Edit' : 'Add'} Travel Checklist Item`}
      >
        <NewChecklistForm
          closeModal={closeModal}
          createTravelChecklist={createTravelChecklist}
          fetchTravelChecklist={fetchTravelChecklist}
          modalType={modalType}
          closeEditModal={this.closeEditModal}
          updateTravelChecklist={updateTravelChecklist}
          checklistItem={itemToEdit}
          currentUser={currentUser}
        />
      </Modal>
    );
  }

  renderDeleteChecklistForm() {
    const { closeModal, shouldOpen, modalType } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="delete-checklist-item"
        visibility={
          shouldOpen && modalType.match('delete checklist item') ? 'visible' : 'invisible'
        }
        title="Delete Travel Checklist Item"
      >
        <p className="delete-checklist-item__reason">Reason</p>
        <textarea
          type="text"
          className="delete-checklist-item__input"
          onChange={this.handleInputChange}
        />
        <span className="delete-checklist-item__disclaimer">
          <img
            src={error}
            alt="profile"
            className="delete-checklist-item__disclaimer--error"
          />
          This action cannot be undone
        </span>
        <div className="delete-checklist-item__hr" />
        <div className="delete-checklist-item__footer">
          <button
            type="button"
            className="delete-checklist-item__footer--cancel"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-checklist-item__footer--delete"
            onClick={this.deleteChecklistItem}
          >
            Delete
          </button>
        </div>
      </Modal>
    );
  }

  renderChecklistPage() {
    const defaultChecklistItem = {
      name: 'Trip Ticket',
      resources: {
        label: '',
        link: ''
      }
    };
    const { isLoading } = this.props;
    return (
      <Fragment>
        {this.renderChecklistPanelHeader()}
        <div className="checklist-page">
          <div id="default-item-header">Default item</div>
          {this.renderChecklistItem(defaultChecklistItem)}
          <div id="added-item-header">Added Items</div>
          {isLoading ? <div id="loading">Loading...</div> : this.renderChecklistItems()}
        </div>
      </Fragment>
    );
  }

  renderChecklistItem(checklistItem) {
    return (
      <div className="checklist-item">
        <div id="item-name">{checklistItem.name}</div>
        {checklistItem.id && (
          <button type="button" id="edit-btn" onClick={() => {this.handleEditItem(checklistItem)}}>
            Edit
          </button>
        )}
        {checklistItem.id && (
          <button type="button" id="delete-btn" onClick={() => {this.setItemToDelete(checklistItem.id)}}>
            Delete
          </button>
        )}
      </div>
    );
  }

  renderChecklistItems() {
    const { checklistItems, openModal, currentUser } = this.props;
    const filtered = checklistItems.filter(checklist => {
      return checklist.destination === currentUser.location;
    });
    return (
      <div className="">
        {
          filtered[0] && filtered[0].checklist.map(checklistItem => {
            return (
              <div key={checklistItem.id}>
                {this.renderChecklistItem(checklistItem)}
              </div>
            );
          })
        }
      </div>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderChecklistForm()}
        {this.renderDeleteChecklistForm()}
        {this.renderChecklistPage()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, travelChecklist, user }) => ({
  ...modal.modal,
  checklistItems: travelChecklist.checklistItems,
  currentUser: user.currentUser,
  // getCurrentUserRole: user.getCurrentUserRole,
  isLoading: travelChecklist.isLoading
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  createTravelChecklist,
  deleteTravelChecklist,
  fetchTravelChecklist,
  updateTravelChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist);

Checklist.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  createTravelChecklist: PropTypes.func.isRequired,
  fetchTravelChecklist: PropTypes.func.isRequired,
  deleteTravelChecklist: PropTypes.func,
  updateTravelChecklist: PropTypes.func,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  checklistItems: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  // getCurrentUserRole: PropTypes.string.isRequired,
  // history: PropTypes.object.isRequired
};

Checklist.defaultProps = {
  deleteTravelChecklist: () => {},
  updateTravelChecklist: () => {},
  modalType: ''
};
