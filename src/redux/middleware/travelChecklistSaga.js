import { put, takeLatest, call } from 'redux-saga/effects';
import TravelChecklistAPI from '../../services/travelChecklistAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  FETCH_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST,
} from '../constants/actionTypes';
import {
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess,
  updateChecklistSuccess,
  updateChecklistFailure,
} from '../actionCreator/travelChecklistActions';


export function* watchFetchAllChecklists() {
  yield takeLatest(FETCH_TRAVEL_CHECKLIST, fetchAllChecklistsSync);
}

export function* fetchAllChecklistsSync(action) {
  try {
    const serverResponse = yield call(
      TravelChecklistAPI.getAllChecklists, action.requestId
    );
    yield put(fetchTravelChecklistSuccess(serverResponse.data));
  } catch(error) {
    const err = apiErrorHandler(error);
    yield put(fetchTravelChecklistFailure(err));
  }
}

export function* updateChecklistAsync(action) {
  try {
    const { checklistItemId, checklistItemData } = action;
    const response = yield call(TravelChecklistAPI.updateChecklist, {checklistItemId, checklistItemData});

    yield put(updateChecklistSuccess(response.data, checklistItemId));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateChecklistFailure(errorMessage));
  }
}

export function* watchUpdateChecklist() {
  yield takeLatest(UPDATE_TRAVEL_CHECKLIST, updateChecklistAsync);
}
