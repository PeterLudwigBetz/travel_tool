import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import AccommodationAPI from '../../services/AccommodationAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  createAccommodation,
  createAccommodationSuccess,
  createAccommodationFailure,
} from '../actionCreator/accommodationAction';
import { closeModal } from '../actionCreator/modalActions';

export function* watchCreateAccommodationSagaAsync() {
  yield takeLatest(createAccommodation().type, accommodationSagaAsync);
}

export function* accommodationSagaAsync(action) {
  try {
    const response = yield call(AccommodationAPI.postAccommodation, action.accommodationData);
    yield put(createAccommodationSuccess(response.data));
    yield put(closeModal());
    toast.success('Guest House added');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createAccommodationFailure(errorMessage));
    toast.error(errorMessage);
  }
}

