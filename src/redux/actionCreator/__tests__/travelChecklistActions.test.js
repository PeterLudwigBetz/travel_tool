import {
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS
} from '../../constants/actionTypes';

import {
  fetchTravelChecklist,
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess,
  deleteTravelChecklist,
  deleteChecklistFailure,
  deleteChecklistSuccess
} from '../travelChecklistActions';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';

describe('Travel checklists actions test', () => {
  describe('Fetch TravelChecklist actions', () => {
    it('should return action of type FETCH_TRAVEL_CHECKLIST', (done) => {
      const expectedAction = {
        type: FETCH_TRAVEL_CHECKLIST,
        requestId: 'request-test-id'
      };

      const newAction = fetchTravelChecklist('request-test-id');
      expect(newAction).toEqual(expectedAction);

      done();
    });

    it('should return action of type FETCH_TRAVEL_CHECKLIST', (done) => {
      const response = {
        travelChecklists: travelChecklistMockData
      };

      const expectedAction = {
        type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
        travelChecklists: travelChecklistMockData
      };

      const newAction = fetchTravelChecklistSuccess(response);
      expect(newAction).toEqual(expectedAction);

      done();
    });

    it('should return action of type FETCH_TRAVEL_CHECKLIST_FAILURE',
      (done) => {
        const expectedAction = {
          type: FETCH_TRAVEL_CHECKLIST_FAILURE,
          error: 'There are no checklist items for your selected destination(s)'
        };

        const newAction = fetchTravelChecklistFailure(
          'There are no checklist items for your selected destination(s)'
        );
        expect(newAction).toEqual(expectedAction);

        done();
      });
  });

  describe('Delete Travel Checklist Actions', () => {
    it('should return action of type DELETE_TRAVEL_CHECKLIST', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_CHECKLIST',
        checklistItemId: 'zdy6fs77sq',
        deleteReason: 'No longer applicable',
      };
      const newAction = deleteTravelChecklist('zdy6fs77sq', 'No longer applicable');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_TRAVEL_CHECKLIST_SUCCESS', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_CHECKLIST_SUCCESS',
        checklistItemId: 'zdy6fs77sq',
      };
      const newAction = deleteChecklistSuccess('zdy6fs77sq');
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DELETE_TRAVEL_CHECKLIST_FAILURE', () => {
      const expectedAction = {
        type: 'DELETE_TRAVEL_CHECKLIST_FAILURE',
        error: 'Checklist item not found'
      };
      const newAction = deleteChecklistFailure('Checklist item not found');
      expect(newAction).toEqual(expectedAction);
    });
  });
});
