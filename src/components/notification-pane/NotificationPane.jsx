import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import NotificationHeader from './NotificationHeader';
import NotificationContainer from './NotificationContainer';

import './_notificationPane.scss';

import notifications from '../../mockData/notifications';
import { handleManagerNotification } from '../../helper/socket/socket';

const generalNotifications = [];

const pendingNotifications = notifications.filter(notification => {
  if (!notification.isPending) {
    generalNotifications.push(notification);
  }
  return notification.isPending;
});

export default class NotificationPane extends PureComponent {
  componentDidMount() {
    console.log('notification pane mounted');
    handleManagerNotification();
  }
  render() {
    const { onCloseNotificationPane } = this.props;
    return (
      <div className="nav-pane">
        <NotificationHeader onCloseNotificationPane={onCloseNotificationPane} />
        <div className="scrollable-div">
          <NotificationContainer
            title="Pending Approvals"
            pendingNotifications={pendingNotifications}
          />
          <NotificationContainer
            title="General Notifications"
            generalNotifications={generalNotifications}
          />
        </div>
        <div className="notification-item__last" />
      </div>
    );
  }
}

NotificationPane.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired
};
