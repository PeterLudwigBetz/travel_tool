import { fetchRequestsResponse } from '../../__mocks__/mocks';
import {
  fetchNotifications, fetchNotificationsFailure, fetchNotificationsSuccess, addNotificationSuccess
} from '../notificationsActions';
import { addNotification } from '../../middleware/notificationSaga';

const notifications = [
  {
    createdAt: '2018-09-18T18:53:18.788Z',
    id: 'BUR2H8uoLB',
    message: 'created a new travel request',
    notificationLink: '/request/KIcWEiP2q',
    notificationStatus: 'unread',
    notificationType: 'pending',
    recipientId: '-L32Kw-c5HU',
    senderId: '-L32Kw-c5HU',
    senderImage: 'link',
    senderName: 'Nella Omnibus',
    updatedAt: '2018-09-18T18:53:18.788Z'
  },
  {
    createdAt: '2018-09-18T18:53:18.788Z',
    id: 'BUR2H8uoLB',
    message: 'created a new travel request',
    notificationLink: '/request/KIcWEiP2q',
    notificationStatus: 'unread',
    notificationType: 'pending',
    recipientId: '-L32Kw-c5HU',
    senderId: '-L32Kw-c5HU',
    senderImage: 'link',
    senderName: 'Nella Omnibus',
    updatedAt: '2018-09-18T18:53:18.788Z'
  }
];

describe('Notifications Actions', () => {
  describe('Fetch Notifications Actions', () => {
    it('should return action type FETCH_NOTIFICATIONS', () => {
      const expectedAction = {
        type: 'FETCH_NOTIFICATIONS',
      };
      const createdAction = fetchNotifications();
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_NOTIFICATIONS_SUCCESS', () => {
      const expectedAction = {
        type: 'FETCH_NOTIFICATIONS_SUCCESS',
        notifications
      };
      const createdAction = fetchNotificationsSuccess(notifications);
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_NOTIFICATION_FAILURE', () => {
      const error = 'Error fetching requests, network error';
      const expectedAction = {
        type: 'FETCH_NOTIFICATIONS_FAILURE',
        error
      };
      const createdAction = fetchNotificationsFailure(error);
      expect(createdAction).toEqual(expectedAction);
    });
  });
  describe('ADD Notifications Actions', () => {
    it('should return action type ADD_NOTIFICATIONS', () => {
      const expectedAction = {
        type: 'ADD_NOTIFICATION',
        notification: notifications[1]
      };
      const createdAction = addNotification(notifications[1]);
      // console.log(createdAction, notifications[1]);
      expect(notifications[1]).toEqual(
        expectedAction.notification
      );
    });

    it('should return action type ADD_NOTIFICATIONS_SUCCESS', () => {
      const expectedAction = {
        type: 'ADD_NOTIFICATION_SUCCESS',
        notification: notifications[0]
      };
      const createdAction = addNotificationSuccess(notifications[0]);
      expect(createdAction).toEqual(expectedAction);
    });
  });
});
