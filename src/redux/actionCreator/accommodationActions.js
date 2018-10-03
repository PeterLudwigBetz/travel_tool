import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  CREATE_ACCOMMODATION_DATA,
  CREATE_ACCOMMODATION_DATA_SUCCESS,
  CREATE_ACCOMMODATION_DATA_FAILURE,
} from '../constants/actionTypes';

export const fetchAccommodation = () => ({
  type: FETCH_ACCOMMODATION_CENTRES,
});

export const fetchAccommodationSuccess = ({guestHouses}) => ({
  type: FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  guestHouses,
});

export const fetchAccommodationFailure = (error) => ({
  type: FETCH_ACCOMMODATION_CENTRES_FAILURE,
  error
});

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
