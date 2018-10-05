import {
  CREATE_ACCOMMODATION_DATA,
  CREATE_ACCOMMODATION_DATA_SUCCESS,
  CREATE_ACCOMMODATION_DATA_FAILURE,
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  EDIT_ACCOMMODATION_DATA,
  EDIT_ACCOMMODATION_DATA_SUCCESS,
  EDIT_ACCOMMODATION_DATA_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  postAccommodationData: [],
  editAccommodationData: {},
  editingAccommodation: false,
  errors: []
};

const accommodation = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_ACCOMMODATION_DATA:
    return {
      ...state,
    };
  case CREATE_ACCOMMODATION_DATA_SUCCESS:
    return {
      ...state,
      postAccommodationData: action.accommodationData,
    };
  case CREATE_ACCOMMODATION_DATA_FAILURE:
    return {
      ...state,
      errors: action.error
    };
  case FETCH_ACCOMMODATION_CENTRES:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_ACCOMMODATION_CENTRES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      guestHouses: action.guestHouses
    };
  case FETCH_ACCOMMODATION_CENTRES_FAILURE:
    return {
      ...state,
      isLoading: false,
      guestHouses: null,
      accommodationError: action.error
    };
  case EDIT_ACCOMMODATION_DATA:
    return { ...state, editingAccommodation: true, guestHouseData: action.guestHouseData, guestHouseId: action.guestHouseId };
  case EDIT_ACCOMMODATION_DATA_SUCCESS:
    return { ...state, editingAccommodation: false,
      guestHouseData: action.guestHouseData,
      error: '', };
  case EDIT_ACCOMMODATION_DATA_FAILURE:
    return { ...state, editingAccommodation: false, error: action.error };
  default: return state;
  }
};

export default accommodation;
