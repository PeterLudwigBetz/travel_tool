import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotificationHeader from './NotificationHeader';
import NotificationContainer from './NotificationContainer';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import './_notificationPane.scss';
import handleManagerNotification from '../../helper/socket/socket';
import {
  fetchUsersNotification,
  updateAllNotificationStatus
} from '../../redux/actionCreator/notificationsActions';

export class NotificationPane extends PureComponent {

  componentDidMount() {
    const { user, fetchUsersNotification } = this.props;
    fetchUsersNotification();
    handleManagerNotification(user && user.UserInfo.id);
  }

  getNotifications() {
    const { notifications } = this.props;
    const generalNotifications = [];
    const pendingNotifications = [];
    notifications.map(notification => {
      if (notification.notificationType === 'general') {
        generalNotifications.push(notification);
      } else if(notification.notificationType === 'pending') {
        pendingNotifications.push(notification);
      }
    });
    return { generalNotifications, pendingNotifications };
  }

  render() {

    const { onCloseNotificationPane, updateAllNotificationStatus } = this.props;
    const { generalNotifications, pendingNotifications } = this.getNotifications();
    return (
      <div className="nav-pane">
        <NotificationHeader onCloseNotificationPane={onCloseNotificationPane} />
        {
          (generalNotifications.length || pendingNotifications.length) ? (
            <div className="scrollable-div">
              {
                (pendingNotifications.length > 0) && (
                  <NotificationContainer
                    title="Pending Approvals"
                    pendingNotifications={pendingNotifications}
                    updateAllNotificationStatus={updateAllNotificationStatus}
                  />
                )
              }
              {
                (generalNotifications.length > 0) && (
                  <NotificationContainer
                    title="General Notifications"
                    generalNotifications={generalNotifications}
                    updateAllNotificationStatus={updateAllNotificationStatus}
                  />)
              }
            </div>
          ) : (
            <div className="no-notification-msg">
              No notifications
            </div>
          )}
        <div className="notification-item__last" />
      </div>

    );
  }
}

NotificationPane.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired,
  fetchUsersNotification: PropTypes.func.isRequired,
  updateAllNotificationStatus: PropTypes.func.isRequired,
  user: PropTypes.object,
  notifications: PropTypes.arrayOf(PropTypes.object)
};

NotificationPane.defaultProps = {
  notifications: [],
  user: {
    UserInfo: {
      id: ''
    }
  }
};

const mapStateToProps = ({auth, notifications, modal}) => ({
  user: auth.user,
  notifications: notifications.notifications,
  ...modal.modal
});

const mapDispatchToProps = {
  fetchUsersNotification,
  updateAllNotificationStatus,
  openModal,
  closeModal,
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificationPane);
