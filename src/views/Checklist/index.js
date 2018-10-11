import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import WithLoadingRoleTable from '../../components/RoleTable';
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
import './ChecklistTable.scss';
import error from '../../images/error.svg';


export class Checklist extends Component {
  state = {
    itemToEdit: null,
    deleteReason: '',
    checklistItemId: ''
  }

  componentDidMount() {
    const { fetchTravelChecklist } = this.props;
    const adminLocation = 'lagos';
    fetchTravelChecklist(null, adminLocation);
    // fetch checklists for admins location
    // only admins should be able to visit this page?
  }

  setItemToDelete(checklistItemId) {
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
    return (
      <div className="rp-role__header">
        <ChecklistPanelHeader openModal={this.openAddModal} />
      </div>
    );
  }

  renderChecklistForm() {
    const { closeModal, shouldOpen, modalType, createTravelChecklist } = this.props;
    const { itemToEdit } = this.state;

    return (
      <Modal
        closeModal={closeModal}
        width="480px"
        visibility={
          shouldOpen && (modalType === 'edit cheklistItem' || 'add cheklistItem') ? 'visible' : 'invisible'
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
          shouldOpen && modalType === 'delete checklist item' ? 'visible' : 'invisible'
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
    return (
      <Fragment>
        {this.renderChecklistPanelHeader()}
        {this.renderChecklistItems()}
      </Fragment>
    );
  }

  renderChecklistItems() {
    const { checklistItems, openModal } = this.props;
    const filtered = checklistItems.filter(checklist => {
      // TODO: get the destination from the store
      // to get it from the store, hit the api to get users
      return checklist.destination === 'Lagos, Nigeria';
    });
    return (
      <Fragment>
        <div className="table__container">
          <table className="mdl-data-table mdl-js-data-table table__requests">
            <thead>
              head
            </thead>
            <tbody className="table__body">
              {
                filtered[0] && filtered[0].checklist.map(checklistItem => {
                  return (
                    <tr key={checklistItem.id} className="table__row">
                      <td className="mdl-data-table__cell--non-numeric">
                        {checklistItem.name}
                      </td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button
                          type="button"
                          onClick={() => {
                            this.handleEditItem(checklistItem);
                          }}>
                            Edit
                        </button>
                      </td>
                      <td className="mdl-data-table__cell--non-numeric" onClick={() => this.setItemToDelete(checklistItem.id)}> {/* eslint-disable-line */}
                        Delete
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </Fragment>
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

const mapStateToProps = ({ modal, travelChecklist }) => ({
  ...modal.modal,
  checklistItems: travelChecklist.checklistItems
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  createTravelChecklist,
  deleteTravelChecklist,
  fetchTravelChecklist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist);

Checklist.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  createTravelChecklist: PropTypes.func,
  deleteTravelChecklist: PropTypes.func,
  fetchTravelChecklist: PropTypes.func,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  checklistItems: PropTypes.array.isRequired
};

Checklist.defaultProps = {
  openModal: () => {},
  closeModal: () => {},
  createTravelChecklist: () => {},
  deleteTravelChecklist: () => {},
  fetchTravelChecklist: () => {},
  modalType: ''
};
