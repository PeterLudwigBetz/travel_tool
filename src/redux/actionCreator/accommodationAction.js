import {
  CREATE_ACCOMMODATION_DATA,
  CREATE_ACCOMMODATION_DATA_SUCCESS,
  CREATE_ACCOMMODATION_DATA_FAILURE,
} from '../constants/actionTypes';

export const createAccommodation  = accommodationData => ({
  type: CREATE_ACCOMMODATION_DATA,
  accommodationData
});

export const createAccommodationSuccess = accommodationData => ({
  type: CREATE_ACCOMMODATION_DATA_SUCCESS,
  accommodationData,
});

export const createAccommodationFailure = error => ({
  type: CREATE_ACCOMMODATION_DATA_FAILURE,
  error,
});
