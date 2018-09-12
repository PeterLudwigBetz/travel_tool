import { put, takeLatest, call } from 'redux-saga/effects';
import apiErrorHandler from '../../services/apiErrorHandler';
import { addNewNotificationSuccess, addNewNotificationFailure } from '../actionCreator/notificationsActions';

export function* newNotification(action) {
  try {
    yield put (addNewNotificationSuccess(action.notification));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put (addNewNotificationFailure(errorMessage));
  }
}

export function* watchNewNotifications() {
  yield takeLatest('ADD_NEW_NOTIFICATION', newNotification);
}
