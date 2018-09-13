import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotificationHeader from './NotificationHeader';
import NotificationContainer from './NotificationContainer';
import RequestsModal from '../RequestsModal/RequestsModal';
import Modal from '../modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import './_notificationPane.scss';
import { handleManagerNotification } from '../../helper/socket/socket';
import {fetchUsersNotification} from '../../redux/actionCreator/notificationsActions';

export class NotificationPane extends PureComponent {

  state = {
    viewRequestDetails: ''
  }
  
  componentDidMount() {
    const { userId, fetchUsersNotification } = this.props;
    handleManagerNotification(userId);
    fetchUsersNotification(userId);
    
  }


  handleLoadRequestDetails = (event) => {
    const { id } = event.target;
    const { openModal } = this.props;
    this.setState({
      viewRequestDetails: id
    });
    openModal(true, 'notifications details');
  }

  renderDetailsModal() {
    const { viewRequestDetails } = this.state;
    const { closeModal, shouldOpen, modalType } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        visibility={(shouldOpen && modalType === 'notifications details') ? 'visible' : 'invisible'}
        title={viewRequestDetails}
        symbol="#"
        description="Request Details"
        modalBar={(
          <div className="table__modal-bar-text">
            Manager stage
          </div>
        )}
      >
        <RequestsModal 
          requestId={viewRequestDetails}
        />
      </Modal>

    );}

  render() {

    const { onCloseNotificationPane, notifications, handleClick } = this.props;
    const generalNotifications = [];
    const pendingNotifications = notifications.filter(notification => {
      if(notification.notificationType !== 'pending'){
        generalNotifications.push(notification);
      }
      return (notification.notificationType === 'pending');
    });
    return (
      <Fragment>
        <div className="nav-pane">
          <NotificationHeader onCloseNotificationPane={onCloseNotificationPane} />
          <div className="scrollable-div">
            <NotificationContainer
              title="Pending Approvals"
              pendingNotifications={pendingNotifications}
              handleClick={this.handleLoadRequestDetails}
            />
            <NotificationContainer
              title="General Notifications"
              generalNotifications={generalNotifications}
            />
          </div>
          <div className="notification-item__last" />
        </div>
        {this.renderDetailsModal()}
      </Fragment>
    );
  }
}

NotificationPane.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired,
  fetchUsersNotification: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({auth, notifications, modal}) => ({
  userId: auth.user.UserInfo.id,
  notifications,
  ...modal.modal
});

const mapDispatchToProps = {
  fetchUsersNotification,
  openModal,
  closeModal
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificationPane);
