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
});
