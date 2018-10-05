import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import AvailableRoomsAPI from '../../../services/AvailableRoomsAPI';
import { watchFetchAvailableRooms } from '../availableRoomsSaga';
import availableRooms from '../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const response = {
  data: {
    availableRooms,
    success: true,
    message: 'Available rooms fetched'
  }
};

const error = 'Possible network error, please reload the page';

describe('Fetch available rooms saga', () => {
  it('fetches available rooms', () => {
    return expectSaga(watchFetchAvailableRooms, AvailableRoomsAPI)
      .provide([[call(AvailableRoomsAPI.getAvailableRooms), response]])
      .put({
        type: 'FETCH_AVAILABLE_ROOMS_SUCCESS',
        availableRooms: response.data.availableRooms
      })
      .dispatch({
        type: 'FETCH_AVAILABLE_ROOMS'
      })
      .run();
  });
  it('fails to fetch availbale rooms and throws error', () => {
    return expectSaga(watchFetchAvailableRooms, AvailableRoomsAPI)
      .provide([[call(AvailableRoomsAPI.getAvailableRooms), throwError(error)]])
      .put({
        type: 'FETCH_AVAILABLE_ROOMS_FAILURE',
        error
      })
      .dispatch({
        type: 'FETCH_AVAILABLE_ROOMS'
      })
      .run();
  });
});
