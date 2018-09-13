import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { fetchRequestsResponse } from '../../__mocks__/mocks';
import {watchFetchUsersNotificationSync} from '../notificationsSaga';
import NotificationsAPI from '../../../services/NotificationsAPI';

const url = '/notification/xDh20cuGx';
const userId = 'xDh20cuGx';

const response = {
  data: {
    ...fetchRequestsResponse
  }
};

describe('Notifications Saga', () => {
  describe('Fetch notification saga', () => {
    it('fetches users notification', () => {
      return expectSaga(watchFetchUsersNotificationSync, NotificationsAPI)
        .provide([
          [call(NotificationsAPI.getUserNotification, url), response]
        ])
        .put({
          type: 'FETCH_USERS_NOTIFICATION_SUCCESS',
        })
        .dispatch({
          type: 'FETCH_USERS_NOTIFICATION',
          url
        })
        .run();
    });
  });
});
