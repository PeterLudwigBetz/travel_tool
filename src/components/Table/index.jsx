import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import RequestDetailsModal from '../RequestsModal/RequestsModal';
import './Table.scss';

class Table extends PureComponent {
  state = {
    clickedRequestId: null,
    hideRequestDetailModal: true
  };

  onCloseRequestDetailsModal = () => {
    this.setState({
      hideRequestDetailModal: true
    });
  };

  handleClickRequest = requestId => {
    this.setState({
      clickedRequestId: requestId,
      hideRequestDetailModal: false
    });
  };

  renderUserImage(approval) {
    const image = approval.image;
    if (image === 'none') {
      return (
        <div className="approvals__table__first__cell">
          <p className="approvals__table__text">
            HM
          </p>
        </div>
      );
    } else if (image === 'null') {
      return (
        <div className="approvals__table__second__cell">
          <p className="approvals__table__text">
            JK
          </p>
        </div>
      );
    } else {
      return (
        <img
          src={approval.image}
          alt="user" className="approvals__table__image"
        />
      );
    }
  }

  renderTootTip(approval) {
    return (
      <div className="tool__tip">
        {approval.name}
      </div>
    );
  }

  renderNoRequests() {
    return (
      <div className="table__requests--empty">
        You have no requests at the moment
      </div>
    );
  }

  renderRequestStatus(request) {
    return (
      <div>
        <div
          id={`status-${request.id}`}
          className={
            request.status === 'Open'
              ? 'request__status--open'
              : request.status === 'Rejected'
                ? 'request__status--rejected'
                : 'request__status--approved'
          }
        >
          {request.status}
        </div>
        <span className="table__request-menu">
          <i className="fa fa-ellipsis-v" />
        </span>
      </div>
    );
  }

  renderUserAvatar(request, avatar) {
    if (avatar) {
      return (
        <td className="mdl-data-table__cell--non-numeric table__image">
          {this.renderUserImage(request)}
          {this.renderTootTip(request)}
        </td>
      );
    }
  }

  renderApprovalsIdCell(request, avatar) {
    if (avatar) {
      return (
        <td className="mdl-data-table__cell--non-numeric table__data table__id">
          {request.id}
        </td>
      );
    } else {
      return (
        <td className="mdl-data-table__cell--non-numeric table__requests__destination table__data">
          <div
            onKeyPress={() => {}}
            onClick={() => this.handleClickRequest(request.id)}
            role="button"
            tabIndex="0"
            className="button-outline"
          >
            {request.id}
          </div>
        </td>
      );
    }
  }

  renderEmptyCell(avatar) {
    if (avatar) {
      return <th className="mdl-data-table__cell--non-numeric table__head" />;
    }
  }

  renderRequest(request, avatar) {
    return (
      <tr key={request.id} className="table__row">
        {this.renderUserAvatar(request, avatar)}
        {this.renderApprovalsIdCell(request, avatar)}
        <td className="mdl-data-table__cell--non-numeric table__data">
          {request.destination}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {request.origin}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {request.duration}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {request.startDate}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__requests__status table__data">
          {this.renderRequestStatus(request)}
        </td>
      </tr>
    );
  }

  renderTableHead(avatar) {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric table__head freeze">
          Request ID
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Destination
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Origin
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Duration
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Start Date
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last">
          Status
        </th>
      </tr>
    );
  }
  
  renderDetailsModal() {
    const { hideRequestDetailModal, clickedRequestId } = this.state;
    return (
      <Modal
        toggleModal={this.onCloseRequestDetailsModal}
        visibility={hideRequestDetailModal ? 'invisible' : 'visible'}
        title={clickedRequestId}
        symbol="#"
        description="Request Details"
        modalBar={(
          <div className="table__modal-bar-text">
            Manager stage
          </div>
        )}
      >
        <RequestDetailsModal handleCreateComment={() => {}} />
      </Modal>

    );}

  render() {
    const { requests, avatar } = this.props;
    return (
      <Fragment>
        <div className="table__container">
          {requests.length ? (
            <table className="mdl-data-table mdl-js-data-table table__requests">
              <thead>
                {this.renderTableHead(avatar)}
              </thead>
              <tbody className="table__body">
                {requests.map(request => this.renderRequest(request, avatar))}
              </tbody>
            </table>
          ) : (
            this.renderNoRequests()
          )}
          {this.renderDetailsModal()}
        </div>
      </Fragment>
    );
  }
}

Table.propTypes = {
  requests: PropTypes.array.isRequired,
  avatar: PropTypes.string
};

Table.defaultProps = {
  avatar: ''
};

export default Table;
