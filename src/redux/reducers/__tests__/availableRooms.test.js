import availableRoomsReducer from '../availableRooms';
import {
  FETCH_AVAILABLE_ROOMS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  FETCH_AVAILABLE_ROOMS_FAILURE
} from '../../constants/actionTypes';
import availableRooms from '../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

describe('Fetch available rooms reducer', () => {
  const initialState = {
    isLoading: false,
    availableRooms: [],
    availableRoomsError: []
  };
  const error = 'Error occured while fetching available rooms';
  it('should return correct initial state', () => {
    expect(availableRoomsReducer(undefined, {})).toEqual({
      ...initialState
    });
  });
  it('should return correct state for FETCH_AVAILABLE_ROOMS', () => {
    const action = {
      type: FETCH_AVAILABLE_ROOMS
    };
    expect(availableRoomsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('should return correct state for FETCH_AVAILABLE_ROOMS_SUCCESS', () => {
    const action = {
      type: FETCH_AVAILABLE_ROOMS_SUCCESS,
      availableRooms
    };
    expect(availableRoomsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      availableRooms
    });
  });
  it('should return correct state for FETCH_AVAILABLE_ROOMS_FAILURE', () => {
    const action = {
      type: FETCH_AVAILABLE_ROOMS_FAILURE,
      error
    };
    expect(availableRoomsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      availableRoomsError: error
    });
  });
});
