import { put, takeLatest, call } from 'redux-saga/effects';
import travelChecklistAPI from '../../services/travelChecklistAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  UPDATE_TRAVEL_CHECKLIST,
} from '../constants/actionTypes';
import {
  updateChecklistSuccess,
  updateChecklistFailure,
} from '../actionCreator/travelChecklistActions';


export function* updateChecklistAsync(action) {
  try {
    const { checklistItemId, checklistItemData } = action;
    const response = yield call(travelChecklistAPI.updateChecklist, {checklistItemId, checklistItemData});
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

