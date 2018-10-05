import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import AccommodationAPI from '../../services/AccommodationAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  createAccommodation,
  createAccommodationSuccess,
  createAccommodationFailure,
  fetchAccommodationSuccess,
  fetchAccommodationFailure,
  editAccommodation,
  editAccommodationSuccess,
  editAccommodationFailure,
} from '../actionCreator/accommodationActions';
import { closeModal } from '../actionCreator/modalActions';
import {
  FETCH_ACCOMMODATION_CENTRES, EDIT_ACCOMMODATION_DATA
} from '../constants/actionTypes';


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

export function* fetchAccommodationSaga() {
  try {
    const response = yield call(
      AccommodationAPI.getAccommodationCentres
    );
    const { data } = response;
    yield put(fetchAccommodationSuccess(data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAccommodationFailure(errorMessage));
  }
}


export function* watchFetchAccommodation() {
  yield takeLatest(
    FETCH_ACCOMMODATION_CENTRES,
    fetchAccommodationSaga);
}

export function* editAccommodationAsync(action) {
  try {
    const { guestHouseId, guestHouseData} = action;
    const response = yield call(AccommodationAPI.editAccommodation, guestHouseData, guestHouseId);
    yield put(editAccommodationSuccess(response.data));
    yield put(closeModal());
    toast.success('Guest House Updated Successfully');
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    console.log(errorMessage)
    yield put(editAccommodationFailure(errorMessage));
  }
}

export function* watchEditAccommodation() {
  yield takeLatest(EDIT_ACCOMMODATION_DATA, editAccommodationAsync);
}
