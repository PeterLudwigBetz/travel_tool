import {
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  fetchAvailableRoomsfailure
} from '../availableRoomsActions';
import {
  FETCH_AVAILABLE_ROOMS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  FETCH_AVAILABLE_ROOMS_FAILURE
} from '../../constants/actionTypes';
import availableRooms from '../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

describe('Available rooms action types', () => {
  it('should return action of type  FETCH_AVAILABLE_ROOMS', (action) => {
    const expectedAction = {
      type: FETCH_AVAILABLE_ROOMS,
      action
    };
    const newAction = fetchAvailableRooms();
    expect(newAction).toEqual(expectedAction);
  });
  it('should return action of type  FETCH_AVAILABLE_ROOMS_FAILURE', () => {
    const error = 'Server error, please try again';
    const expectedAction = {
      type: FETCH_AVAILABLE_ROOMS_FAILURE,
      error
    };
    const newAction = fetchAvailableRoomsfailure(error);
    expect(newAction).toEqual(expectedAction);
  });
  it('should return action of type FETCH_AVAILABLE_ROOMS_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'Available rooms fetched',
        availableRooms
      }
    };
    const expectedAction = {
      type: FETCH_AVAILABLE_ROOMS_SUCCESS,
      availableRooms
    };
    const newAction = fetchAvailableRoomsSuccess(response.data);
    expect(newAction).toEqual(expectedAction);
  });
});
