import {
  createAccommodation,
  createAccommodationSuccess,
  createAccommodationFailure,
} from '../accommodationAction';

//import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';

describe('Create Accommodation actions test', () => {
  describe('Create Accommodation actions', () => {
    it('should return action of type CREATE_ACCOMMODATION_DATA', () => {
      const expectedAction = {
        type: 'CREATE_ACCOMMODATION_DATA',
      };
      const newAction = createAccommodation();
      expect(newAction).toEqual(expectedAction);
    });

    // it('should return action of type FETCH_ACCOMMODATION_CENTRES_FALIURE',
    //   () => {
    //     const error = 'Server error, please try again';
    //     const expectedAction = {
    //       type: 'CREATE_ACCOMMODATION_DATA_SUCCESS',
    //       error
    //     };

    //     const newAction = createAccommodationSuccess(error);
    //     expect(newAction).toEqual(expectedAction);
    //   });

    // it('should return action of type FETCH_ACCOMMODATION_CENTRES_SUCCESS',
    //   () => {
    //     const response = {
    //       data: {
    //         success: true,
    //         message: 'Successfully retrieved guestHouses',
    //         guestHouses,
    //       }
    //     };
    //     const expectedAction = {
    //       type: FETCH_ACCOMMODATION_CENTRES_SUCCESS,
    //       guestHouses
    //     };

    //     const newAction = fetchAccommodationSuccess(response.data);
    //     expect(newAction).toEqual(expectedAction);
    //   });
  });
});
