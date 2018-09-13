import {
  FETCH_USERS_NOTIFICATION,
  FETCH_USERS_NOTIFICATION_SUCCESS,
  FETCH_USERS_NOTIFICATION_FAILURE,
} from '../constants/actionTypes';

export const fetchUsersNotification = userId => ({
  type: FETCH_USERS_NOTIFICATION,
  userId
});
export const fetchUsersNotificationSuccess = notifications => ({
  type: FETCH_USERS_NOTIFICATION_SUCCESS,
  notifications
});
export const fetchUsersNotificationFailure = error => ({
  type: FETCH_USERS_NOTIFICATION_FAILURE,
  error
});
