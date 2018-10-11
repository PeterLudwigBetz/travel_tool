import travelChecklistReducer, { initialState } from '../travelChecklist';
import {
  fetchTravelChecklist,
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess
} from '../../actionCreator/travelChecklistActions';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';
import { DELETE_TRAVEL_CHECKLIST_FAILURE, DELETE_TRAVEL_CHECKLIST_SUCCESS, DELETE_TRAVEL_CHECKLIST } from '../../constants/actionTypes';


describe('Travel checklists reducer', () => {
  describe('Fetch travel checklists reducer', () => {
    it(`should update 'isLoading' state to true
    while sending get travel checklist server request`, (done) => {
      const action = fetchTravelChecklist('request-test-id');
      const newState = travelChecklistReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      done();
    });

    it('should add travelChecklist to state on successful fetching',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          checklistItems: travelChecklistMockData
        };
        const response = {
          travelChecklists: travelChecklistMockData
        };

        const action = fetchTravelChecklistSuccess(response);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState.isLoading).toBe(false);
        expect(newState.checklistItems).toMatchObject(travelChecklistMockData);
        done();
      });

    it('should add travelChecklist to state on successful fetching',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          checklistItems: travelChecklistMockData
        };
        const error = 'Server Error';

        const action = fetchTravelChecklistFailure(error);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState).toEqual({
          ...initialState,
          isLoading: false,
          checklistItems: [],
          error: 'Server Error'
        });

        done();
      });
  });

  describe('Delete travelChecklist reducer', () => {
    let action, newState, expectedState;

    it('should return initial state', () => {
      expect(travelChecklistReducer(undefined, {})).toEqual({
        ...initialState
      });
    });

    it('should handle DELETE_TRAVEL_CHECKLIST', () => {
      action = {
        type: DELETE_TRAVEL_CHECKLIST,
        checklistItemId: 'zcis7csUe',
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        checklistItems: [
          {
            id: 'wsis45cUe',
            label: 'application guide'
          },
          {
            id: 'zcis7csUe',
            label: 'yellow card'
          }
        ],
        deletingChecklist: true,
        error: '',
        updatingChecklist: false
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_TRAVEL_CHECKLIST_SUCCESS', () => {
      action = {
        type: DELETE_TRAVEL_CHECKLIST_SUCCESS,
        checklistItemId: 'wsis45cUe',
      };

      newState = travelChecklistReducer(initialState, action);

      expectedState = {
        checklistItems: [
          {
            id: 'zcis7csUe',
            'label': 'yellow card'
          }
        ],
        deletingChecklist: false,
        error: '',
        'updatingChecklist': false
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_TRAVEL_CHECKLIST_FAILURE', () => {
      const error = 'Checklist item not found';
      action = {
        type: DELETE_TRAVEL_CHECKLIST_FAILURE,
        error
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        deletingChecklist: false,
        error: 'Checklist item not found'
      };
      expect(newState).toMatchObject(expectedState);
    });
  });
});

