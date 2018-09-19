import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Oval2 from '../../images/Oval2.png';
import ConnectedCommentBox from './CommentBox/CommentBox';
import ImageLink from '../image-link/ImageLink';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { updateRequestStatus } from '../../redux/actionCreator/approvalActions';
import './RequestsModal.scss';
import AddComment from './CommentBox/AddComment';
import UserComments from './UserComments/UserComments';
import UserInfo from './UserInfo/UserInfo';
import RequestInfo from './RequestInfo/RequestInfo';

export class RequestDetailsModal extends Component {
  state = {
    approveColor: '',
    rejectColor: '',
    approveTextColor: '',
    rejectTextColor: '',
  };

  componentDidMount() {
    const { fetchUserRequestDetails, requestId } = this.props;
    fetchUserRequestDetails(requestId);
  }

  updateRequestStatus = () => {
    const { requestId, newStatus }= this.state;
    const { updateRequestStatus } = this.props;
    updateRequestStatus({requestId, newStatus});
  }

  handleButtonState = (approveColor, rejectColor, approveTextColor, rejectTextColor, newStatus, requestId) => {
    this.setState({
      approveColor,
      rejectColor,
      approveTextColor,
      rejectTextColor,
      newStatus,
      requestId }, () => this.updateRequestStatus());
  }

  changeButtonColor = (button, status) => {
    const style = {
      color: 'white'
    };
    if (status === 'Approved' && button.id === 1) {
      style.backgroundColor = '#49AAAF';
      return style;
    } else if (status === 'Rejected' && button.id === 2) {
      style.backgroundColor = '#FF5359';
      return style;
    } else {
      style.color = 'black';
      style.backgroundColor = 'white';
      return style;
    }
  }

  handleApprove = (requestId) => {
    return () => {
      this.handleButtonState('#49AAAF', '', 'white', '','Approved', requestId);
    };
  };

  handleReject = (requestId) => {
    return () => {
      this.handleButtonState('', '#FF5359', '', 'white', 'Rejected', requestId);
    };
  };

  showButtons = (approveColor, rejectColor, approveTextColor, rejectTextColor, id) => {
    return (
      [
        {
          id: 1,
          onClick: this.handleApprove(id),
          action: approveColor,
          actionText: approveTextColor,
          class: 'modal__button-submitted-text bg',
          text: 'Approve'
        },
        {
          id: 2,
          onClick: this.handleReject(id),
          action: rejectColor,
          actionText: rejectTextColor,
          class: 'modal__button-rejected-text',
          text: 'Reject'
        }
      ]);
  }

  disableButtons(status, page) {
    const { isStatusUpdating } = this.props;
    return page === 'Requests' ||
      page === 'Approvals' && (status && ['Approved', 'Rejected'].includes(status)) ||
      isStatusUpdating;
  }

  shouldButtonsRender(status) {
    const { page } = this.props;
    if (page === 'Requests' && status === 'Open') return this.renderStatusAsBadge(status);
    else return this.renderButtons();
  }

  renderButtonText(status, text) {
    return status && status.includes(text) ? status : text;
  }

  renderStatusAsBadge(status) {
    const style = `request__status--${!status ? '' : status.toLowerCase()}`;
    return (
      <div className="modal__button-below">
        <span className={style}>
          {status}
        </span>
      </div>
    );
  }

  renderTravelInfo() {
    const { requestData } = this.props;
    return (
      <div className="modal__travel-place">
        <span className="modal__dialog1">
          Request to travel to:
          <span className="modal__city-name">
            {requestData && requestData.destination}
          </span>
        </span>
        <span className="modal__dialog-from">
          From:
          <span className="modal__city-name">
            {requestData && requestData.origin}
          </span>
        </span>
      </div>
    );
  }

  renderButtons() {
    const { approveColor, rejectColor, approveTextColor, rejectTextColor } = this.state;
    const { requestData: { id, status }, page } = this.props;
    let displayButtons = this.showButtons(approveColor, rejectColor, approveTextColor, rejectTextColor, id)
      .map((button)=>{
        const buttonStyle = this.changeButtonColor(button, status);
        return (
          <span key={button.id}>
            <span className="modal__dialog-btn">
              <button
                style={{
                  backgroundColor: `${buttonStyle.backgroundColor}`,
                  color: `${buttonStyle.color}`, cursor: status === 'Open' ? 'Pointer' : ''
                }}
                onClick={button.onClick}
                className={button.class}
                id={'b'+button.id}
                type="button"
                disabled={this.disableButtons(status, page, button.text)}
              >
                {this.renderButtonText(status, button.text)}
              </button>
            </span>
          </span>
        );
      });

    return (
      <div className="modal__button-below">
        {displayButtons}
      </div>
    );
  }

  renderRequestApproval() {
    const { requestData } = this.props;
    return (
      <div className="modal__modal1">
        <span className="modal__mdl-icons">
          <ImageLink
            imageSrc={Oval2}
            altText="avatar"
            imageClass="modal__oval-copy" />
          <span className="modal__user-name">
            {requestData && requestData.manager}
          </span>
          <span className="modal__approval-status">
          approved your travel request.
          </span>
          <span className="modal__hours-status">
           5 hours ago
          </span>
        </span>
      </div>
    );
  }

  render() {
    const { requestId, requestData, user } = this.props;
    const { status, comments } = requestData;
    return (
      <Fragment>
        <UserInfo
          requestData={requestData}
          user={user}
        />
        {this.renderTravelInfo()}
        <RequestInfo
          requestData={requestData}
        />
        {this.shouldButtonsRender(status)}
        <AddComment
          image={user.picture}
        />
        <ConnectedCommentBox requestId={requestId} />
        {(requestData && status) === 'Approved' && this.renderRequestApproval()}
        <div id="comments">
          <UserComments comments={comments} />
        </div>
      </Fragment>
    );
  }
}
RequestDetailsModal.propTypes = {
  fetchUserRequestDetails: PropTypes.func,
  updateRequestStatus: PropTypes.func,
  requestId: PropTypes.string,
  user: PropTypes.object,
  requestData: PropTypes.object,
  isStatusUpdating: PropTypes.bool,
  page: PropTypes.string
};

RequestDetailsModal.defaultProps = {
  fetchUserRequestDetails: () => {},
  updateRequestStatus: () => {},
  requestId: '',
  requestData: {},
  user: {},
  isStatusUpdating: false,
  page: '',
};

const mapStateToProps = (state) => {
  return {
    requestData: state.requests.requestData,
    user: state.auth.user.UserInfo,
    isStatusUpdating: state.approvals.updatingStatus,
    ...state.modal.modal
  };
};

const actionCreators = {
  fetchUserRequestDetails,
  updateRequestStatus
};

export default connect(mapStateToProps, actionCreators)(RequestDetailsModal);

