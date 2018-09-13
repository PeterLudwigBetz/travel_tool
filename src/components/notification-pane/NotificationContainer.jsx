import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_notificationContainer.scss';
import NotificationItem from './NotificationItem';

export default class NotificationContainer extends PureComponent {

  renderNotifications = (notifications) => {
    const {handleClick} = this.props;
    return notifications.map(
      notification => {
        let isPending = false;
        if(notification.notificationType === 'pending'){
          isPending = true;
        }
        return  (
          <NotificationItem
            handleClick={handleClick}
            id={notification.requestId}
            key={notification.id}
            isPending={isPending}
            name={notification.senderName}
            messageOpened={notification.notificationStatus}
            image={notification.senderImage}
          />
        );
      } 
    );
  };

  render() {
    const { title, pendingNotifications, generalNotifications, handleClick } = this.props;
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
              {number}
            </div>
          </div>
          <div className="notification-container__header__action">
              mark all as read
          </div>
        </div>
        {title === 'Pending Approvals' && this.renderNotifications(pendingNotifications,handleClick)}
        {title === 'General Notifications' && this.renderNotifications(generalNotifications)}
      </div>
    );
  }
}

const NOTIFICATIONS_PROPTYPES = PropTypes.arrayOf(PropTypes.shape({
  requestId: PropTypes.string.isRequired,
  notificationStatus: PropTypes.string.isRequired,
  senderImage: PropTypes.string.isRequired,
}));

NotificationContainer.propTypes = {
  title: PropTypes.string.isRequired,
  pendingNotifications: NOTIFICATIONS_PROPTYPES,
  generalNotifications: NOTIFICATIONS_PROPTYPES
};

NotificationContainer.defaultProps = {
  pendingNotifications: [],
  generalNotifications: []
};
