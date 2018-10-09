import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import TravelChecklistAPI from '../../services/travelChecklistAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  FETCH_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST,
  CREATE_TRAVEL_CHECKLIST
} from '../constants/actionTypes';
import {
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess,
  updateChecklistSuccess,
  updateChecklistFailure,
  createChecklistFailure,
  createChecklistSuccess,
} from '../actionCreator/travelChecklistActions';
import { closeModal } from '../actionCreator/modalActions';

export function* createChecklistAsync(action) {
  try {


    const { requiresFiles, label, link, itemName } = action.checklistItemData;
    // restructure data from CREATE_TRAVEL_CHECKLIST action
    // to match what the api is expecting
    const checklistItemData = {
      name: itemName,
      requiresFiles: requiresFiles === 'true',// convert to boolean
      resources: [
        {
          label,
          link
        }
      ]
    };
    const response = yield call(TravelChecklistAPI.createChecklist, checklistItemData);
    yield put(createChecklistSuccess(response.data));
    yield put(closeModal());
    toast.success(response.data.message);
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createChecklistFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchCreateChecklist() {
  yield takeLatest(CREATE_TRAVEL_CHECKLIST, createChecklistAsync);
}

export function* fetchAllChecklistsSync(action) {
  try {
    const serverResponse = yield call(
      TravelChecklistAPI.getAllChecklists, action.requestId, action.destinationName
    );
    yield put(fetchTravelChecklistSuccess(serverResponse.data));
  } catch(error) {
    const err = apiErrorHandler(error);
    yield put(fetchTravelChecklistFailure(err));
  }
}

export function* watchFetchAllChecklists() {
  yield takeLatest(FETCH_TRAVEL_CHECKLIST, fetchAllChecklistsSync);
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

