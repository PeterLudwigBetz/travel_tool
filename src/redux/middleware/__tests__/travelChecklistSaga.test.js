import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchFetchAllChecklists, watchDeleteChecklist
} from '../travelChecklistSaga';
import TravelChecklistAPI from '../../../services/travelChecklistAPI';
import {
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST,
  DELETE_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST_FAILURE
} from '../../constants/actionTypes';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';



describe('Travel Checklist Saga test', () => {
  describe('Fetch travel checklist', () => {
    const response = {
      data: {
        travelChecklists: travelChecklistMockData
      }
    };

    const requestId = 'request-test-id';

    it('fetches all travel checklist for a requestId', () => {
      return expectSaga(watchFetchAllChecklists)
        .provide([[
          call(TravelChecklistAPI.getAllChecklists, requestId),
          response
        ]])
        .put({
          type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
          travelChecklists: response.data.travelChecklists
        })
        .dispatch({
          type: FETCH_TRAVEL_CHECKLIST,
          requestId
        })
        .run();
    });

    it('fetches all travel checklist', () => {
      return expectSaga(watchFetchAllChecklists)
        .provide([[
          call(TravelChecklistAPI.getAllChecklists, undefined),
          response
        ]])
        .put({
          type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
          travelChecklists: response.data.travelChecklists
        })
        .dispatch({
          type: FETCH_TRAVEL_CHECKLIST,
          requestId: undefined
        })
        .run();
    });

    it('handles failed travel checklist fetch', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };

      return expectSaga(watchFetchAllChecklists)
        .provide([[
          call(TravelChecklistAPI.getAllChecklists, requestId),
          throwError(error)
        ]])
        .put({
          type: FETCH_TRAVEL_CHECKLIST_FAILURE,
          error: error.message
        })
        .dispatch({
          type: FETCH_TRAVEL_CHECKLIST,
          requestId
        })
        .run();
    });
  });

  describe('Delete travel checklist item', () => {
    const checklistItemId = '23ErGDS6';
    const deleteReason = 'Hello world';
    const response = {
      data: {
        travelChecklists: travelChecklistMockData
      }
    };

    it('deletes a travel checklist item successfully', () => {
      return expectSaga(watchDeleteChecklist)
        .provide([[
          call(TravelChecklistAPI.deleteChecklistItem, {
            checklistItemId, deleteReason
          }),
          response
        ]])
        .put({
          type: DELETE_TRAVEL_CHECKLIST_SUCCESS,
          checklistItemId
        })
        .dispatch({
          type: DELETE_TRAVEL_CHECKLIST,
          checklistItemId,
          deleteReason
        })
        .run();
    });

    it('handles failed travel checklist item delete', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };

      return expectSaga(watchDeleteChecklist)
        .provide([[
          call(TravelChecklistAPI.deleteChecklistItem, {
            checklistItemId, deleteReason
          }),
          throwError(error)
        ]])
        .put({
          type: DELETE_TRAVEL_CHECKLIST_FAILURE,
          error: error.message
        })
        .dispatch({
          type: DELETE_TRAVEL_CHECKLIST,
          checklistItemId,
          deleteReason
        })
        .run();
    });
  });
});
