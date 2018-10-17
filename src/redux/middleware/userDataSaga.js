import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import Cookie from 'cookies-js';
import axios from 'axios';
import UserAPI from '../../services/UserAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  postUserData,
  postUserDataSuccess,
  postUserDataFailure,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
} from '../actionCreator/userActions';

const usersStagingUrl = process.env.REACT_APP_ALL_USERS_STAGING;

export function* watchPostUserDataSagaAsync() {
  yield takeLatest(postUserData().type, postUserDataSagaAsync);
}

export function* postUserDataSagaAsync(action) {
  try {
    const dataFromStagingApi = yield call(UserAPI.getUserDataFromStagingApi,
      action.userData.email,
    );
    const location = dataFromStagingApi.data.values[0].location.name;
    action.userData.location = location || process.env.REACT_APP_DEFAULT_LOCATION;
    const response = yield call(UserAPI.postNewUsers, action.userData);
    yield put(postUserDataSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(postUserDataFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchGetUserDataSagaAsync() {
  yield takeLatest(getUserData().type, fetchUserDataSaga);
}

export function* fetchUserDataSaga(action) {
  try {
    const response = yield call(UserAPI.getUserData, action.id);
    const dataFromStagingApi = yield call(UserAPI.getUserDataFromStagingApi,
      response.data.result.email,
    );
    const location = dataFromStagingApi.data.values[0].location.name;
    response.data.result.location = location || process.env.REACT_APP_DEFAULT_LOCATION;
    yield put(getUserDataSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUserDataFailure(errorMessage));
  }
}
