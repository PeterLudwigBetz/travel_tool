import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_USERS_NOTIFICATION, ADD_USERS_NOTIFICATION } from '../constants/actionTypes';
import { fetchUsersNotificationSuccess, fetchUsersNotificationFailure, addUsersNotificationSuccess, addUsersNotificationFailure } from '../actionCreator/notificationsActions';
import NotificationAPI from '../../services/NotificationsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchUsersNotificationSync(){
  try{
    const response = yield call(NotificationAPI.getNotifications);
    yield put(fetchUsersNotificationSuccess(response.data.notifications));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUsersNotificationFailure(errorMessage));
  }
}

export function* watchFetchUsersNotificationSync(){
  yield takeLatest(FETCH_USERS_NOTIFICATION, fetchUsersNotificationSync);
}

export function* addUsersNotificationSync(action){     
  yield put(addUsersNotificationSuccess(action.notification));
}

export function* watchaddUsersNotificationSync(){
  yield takeLatest(ADD_USERS_NOTIFICATION, addUsersNotificationSync);
}
