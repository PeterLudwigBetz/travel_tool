import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Editor } from '@tinymce/tinymce-react';
import Modal from '../modal/Modal';
import RequestDetailsModal from '../../views/RequestsModal/RequestsModal';
// import Oval from '../../images/Oval.png';
// import Oval2 from '../../images/Oval2.png';
import './_requests.scss';

class Requests extends Component {
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

  renderRequest(request) {
    return (
      <tr key={request.id} className="table__row">
        <td className="mdl-data-table__cell--non-numeric table__requests__destination table__data">
          <div
            onKeyPress={() => {}}
            onClick={() => this.handleClickRequest(request.id)}
            role="button"
            tabIndex="0"
          >
            {request.id}
          </div>
        </td>
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

  renderTableHead() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric table__head">
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

  render() {
    const { requests } = this.props;
    const { hideRequestDetailModal, clickedRequestId } = this.state;
    return (
      <Fragment>
        <div>
          <div className="table__container">
            {requests.length ? (
              <table className="mdl-data-table mdl-js-data-table table__requests">
                <thead>
                  {this.renderTableHead()}
                </thead>
                <tbody className="table__body">
                  {requests.map(request => this.renderRequest(request))}
                </tbody>
              </table>
            ) : (
              this.renderNoRequests()
            )}

            <Modal
              toggleModal={this.onCloseRequestDetailsModal}
              className={hideRequestDetailModal ? 'invisible' : 'visible'}
              title={clickedRequestId}
              symbol="#"
              description="Request Details"
              modalBar={(
                <span className="table__modal-bar">
                  <span className="table__modal-bar-text">
Manager stage
                  </span>
                </span>
)}
            >
              <RequestDetailsModal />
            </Modal>
          </div>
        </div>
      </Fragment>
    );
  }
}

Requests.propTypes = {
  requests: PropTypes.array.isRequired
};

export default Requests;
