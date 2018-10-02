import {
  CREATE_ACCOMMODATION_DATA,
  CREATE_ACCOMMODATION_DATA_SUCCESS,
  CREATE_ACCOMMODATION_DATA_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  postAccommodationData: [],
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
  default:
    return state;
  }
};

export default accommodation;
