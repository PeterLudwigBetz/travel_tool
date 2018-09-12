import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_notificationContainer.scss';
import NotificationItem from './NotificationItem';

export default class NotificationContainer extends PureComponent {

  renderNotifications = (notifications) => {
    return notifications.length && notifications.map(
      notification => {
        let isPending = false;
        if(notification.notificationType === 'pending'){
          isPending = true;
        }
        return  (
          <NotificationItem
            id={notification.requestId}
            key={notification.id}
            isPending={isPending}
            name={notification.senderName}
            messageOpened={notification.notificationStatus}
            timeStamp={notification.createdAt}
            image={notification.senderImage}
            message={notification.message}
          />
        );
      }
    );
  };

  render() {
    const { title, pendingNotifications, generalNotifications } = this.props;
    const customClass = title === 'Pending Approvals' ? 'pending' : 'general';
    const number = title === 'Pending Approvals'
      ? pendingNotifications.length
      : generalNotifications.length;

    return (
      <div className="notification-container">
        <div className={`notification-container__header--${customClass}`}>
          <div className="notification-container__header__title">
            {title}
            <div className={`notification-container__header__title__number--${customClass}`}>
              {number !== 0 && number}
            </div>
          </div>
          <div className="notification-container__header__action">
              mark all as read
          </div>
        </div>
        {title === 'Pending Approvals' && number !== 0 && this.renderNotifications(pendingNotifications)}
        {title === 'General Notifications' && number !== 0 && this.renderNotifications(generalNotifications)}
      </div>
    );
  }
}

const NOTIFICATIONS_PROPTYPES = PropTypes.arrayOf(PropTypes.shape({
  isPending: PropTypes.bool,
  name: PropTypes.string,
  notificationStatus: PropTypes.string,
  image: PropTypes.string,
}));

NotificationContainer.propTypes = {
  title: PropTypes.string.isRequired,
  pendingNotifications: NOTIFICATIONS_PROPTYPES,
  generalNotifications: NOTIFICATIONS_PROPTYPES,
};

NotificationContainer.defaultProps = {
  pendingNotifications: [],
  generalNotifications: [],
};
