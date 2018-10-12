import toast from 'toastr';
import { put, takeLatest, call } from 'redux-saga/effects';
import { ADD_MAINTENANCE_RECORD } from '../constants/actionTypes';
import MaintainaceApi from '../../services/MaintainaceApi';
import maintenanceAction from '../actionCreator/maintenanceAction';

export function* AddMainteinanceSaga(action) {
  try {
    console.log('me')
    const response = yield call(MaintainaceApi.addMaintainanceRecord, action.data, action.roomId);
    console.log('you')
    const message = response.data.message;
    toast.success(message);
  } catch (error) { /* istanbul ignore next */
    return error;
  }
}

export function* watchAddMainteinanceAsync() {
  yield takeLatest(ADD_MAINTENANCE_RECORD, AddMainteinanceSaga);
}


