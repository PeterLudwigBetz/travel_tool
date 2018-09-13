import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_USERS_NOTIFICATION } from '../constants/actionTypes';
import { fetchUsersNotificationSuccess, fetchUsersNotificationFailure } from '../actionCreator/notificationsActions';
import NotificationAPI from '../../services/NotificationsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchUsersNotificationSync(action){
  try{
      
    const response = yield call(NotificationAPI.getUserNotification, action.userId);
    yield put(fetchUsersNotificationSuccess(response.data.result));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUsersNotificationFailure(errorMessage));
  }
}

export function* watchFetchUsersNotificationSync(){
  yield takeLatest(FETCH_USERS_NOTIFICATION, fetchUsersNotificationSync);
}
