import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import {
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails,
  watchEditRequest,
} from './requestsSaga';
import {
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync
} from './userDataSaga';
import {
  watchGetRoleDataSagaAsync,
  watchPutRoleDataSagaAsync
} from './roleDataSaga';
import { watchFetchRoleUsers } from './roleSaga';
import {
  watchCreateComment,
  watchEditComment,
  watchDeleteComment
} from './commentsSaga';
import {
  watchFetchApprovals,
  watchUpdateRequestStatus
} from './approvalsSaga';
import {
  watchFetchNotifications,
  watchAddNotification,
  watchUpdateAllNotificationStatus,
  markSingleNotificationAsReadSaga
} from './notificationsSaga';



import { watchUpdateUserProfileAsync } from './UserProfileSaga';

import {
  watchCreateAccommodationSagaAsync,
  watchFetchAccommodation,
  watchFetchTimelneData,
  watchEditAccommodation,
} from './accommodationSaga';
import { watchFetchOccupations } from './occupationSaga';

import { watchUpdateRoomsAsync } from './roomUpdateSaga';
import {watchAddMainteinanceAsync} from './MaintenenceSaga';

import {
  watchFetchTrips,
  watchUpdateTrip
} from './tripsSaga';


function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchFetchApprovals(),
    watchCreateNewRequestAsync(),
    watchPostUserDataSagaAsync(),
    watchGetUserDataSagaAsync(),
    watchGetRoleDataSagaAsync(),
    watchPutRoleDataSagaAsync(),
    watchFetchRoleUsers(),
    watchFetchUserRequestsDetails(),
    watchCreateComment(),
    watchDeleteComment(),
    watchUpdateRequestStatus(),
    watchEditComment(),
    watchFetchNotifications(),
    watchUpdateRoomsAsync(),
    watchUpdateUserProfileAsync(),
    watchEditRequest(),
    watchAddNotification(),
    watchFetchAccommodation(),
    watchEditAccommodation(),
    watchUpdateAllNotificationStatus(),
    watchCreateAccommodationSagaAsync(),
    watchFetchTimelneData(),
    markSingleNotificationAsReadSaga(),
    watchFetchTrips(),
    watchUpdateTrip(),
    watchAddMainteinanceAsync(),
    watchFetchOccupations(),
  ]);
}

export default rootSaga;
