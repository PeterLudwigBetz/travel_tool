import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchFetchAllChecklists
} from '../travelChecklistSaga';
import TravelChecklistAPI from '../../../services/travelChecklistAPI';
import {
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS
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

    describe('Update travel checklist', () => {
      it('test an action', (done) => {
        done();
      });
    });
  });
});
