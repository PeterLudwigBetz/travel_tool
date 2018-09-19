import {
  FETCH_USERS_NOTIFICATION,
  FETCH_USERS_NOTIFICATION_SUCCESS,
  FETCH_USERS_NOTIFICATION_FAILURE,
  ADD_USERS_NOTIFICATION,
  ADD_USERS_NOTIFICATION_SUCCESS,
  ADD_USERS_NOTIFICATION_FAILURE,
} from '../constants/actionTypes';

export const fetchUsersNotification = () => ({
  type: FETCH_USERS_NOTIFICATION,
});
export const fetchUsersNotificationSuccess = notifications => ({
  type: FETCH_USERS_NOTIFICATION_SUCCESS,
  notifications
});
export const fetchUsersNotificationFailure = error => ({
  type: FETCH_USERS_NOTIFICATION_FAILURE,
  error
});

export const addUsersNotification = notification => ({
  type: ADD_USERS_NOTIFICATION,
  notification
});
export const addUsersNotificationSuccess = notification => ({
  type: ADD_USERS_NOTIFICATION_SUCCESS,
  notification
});
export const addUsersNotificationFailure = error => ({
  type: ADD_USERS_NOTIFICATION_FAILURE,
  error
});
