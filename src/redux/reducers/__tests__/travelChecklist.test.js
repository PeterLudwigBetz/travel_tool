import travelChecklistReducer, { initialState } from '../travelChecklist';
import {
  fetchTravelChecklist,
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess
} from '../../actionCreator/travelChecklistActions';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';



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

  describe('Update travel checklist reducer', () => {
    const initialState = {
      updatingChecklist: false,
      checklistItems: [
        {name: 'Yellow Fever', id: 'sd343f4'},
        {name: 'Passport', id: '34ffr4'}
      ],
      error: ''
    };

    let action, newState, expectedState;

    describe('TravelChecklist Reducer', () => {
      it('should handle UPDATE_TRAVEL_CHECKLIST', () => {
        action = {
          type: 'UPDATE_TRAVEL_CHECKLIST',
          checklistItemId: 'sj3934sa',
          checklistItemData: {name: 'newItem'}
        };

        newState = travelChecklistReducer(initialState, action);
        expectedState = {
          updatingChecklist: true,
          checklistItems: [
            {name: 'Yellow Fever', id: 'sd343f4'},
            {name: 'Passport', id: '34ffr4'}
          ],
          error: ''
        };

        expect(newState).toEqual(expectedState);
      });
      it('should handle UPDATE_TRAVEL_CHECKLIST_SUCCESS', () => {
        action = {
          type: 'UPDATE_TRAVEL_CHECKLIST_SUCCESS',
          updatedChecklistItem: {name: 'Tax clearance', id: 'sd343f4'},
          checklistItemId: 'sd343f4'
        };

        newState = travelChecklistReducer(initialState, action);

        expectedState = {
          updatingChecklist: false,
          checklistItems: [
            {name: 'Passport', id: '34ffr4'},
            {name: 'Tax clearance', id: 'sd343f4'}
          ],
          error: ''
        };

        expect(newState).toEqual(expectedState);
      });
      it('should handle UPDATE_TRAVEL_CHECKLIST_FAILURE', () => {
        action = {
          type: 'UPDATE_TRAVEL_CHECKLIST_FAILURE',
          error: {message: 'Something went wrong'}
        };

        newState = travelChecklistReducer(initialState, action);

        expectedState = {
          updatingChecklist: false,
          checklistItems: [
            {name: 'Yellow Fever', id: 'sd343f4'},
            {name: 'Passport', id: '34ffr4'}
          ],
          error: {message: 'Something went wrong'}
        };

        expect(newState).toEqual(expectedState);
      });
    });
  });
});

