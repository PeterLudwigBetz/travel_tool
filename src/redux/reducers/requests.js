import {
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
  CREATE_NEW_REQUEST,
  CREATE_NEW_REQUEST_SUCCESS,
  CREATE_NEW_REQUEST_FAILURE,
  FETCH_USER_REQUEST_DETAILS,
  FETCH_USER_REQUEST_DETAILS_SUCCESS,
  FETCH_USER_REQUEST_DETAILS_FAILURE,
  EDIT_REQUEST,
  EDIT_REQUEST_SUCCESS,
  EDIT_REQUEST_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  requestData: {}
};
let editedRequestIndex;
const requests = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_USER_REQUESTS:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_USER_REQUESTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      message: action.message,
      requests: action.requests,
      openRequestsCount: action.meta.count.open,
      pastRequestsCount: action.meta.count.past,
      pagination: action.meta.pagination,
    };
  case FETCH_USER_REQUESTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      fetchRequestsError: action.error,
    };
  case CREATE_NEW_REQUEST:
    return {
      ...state,
      creatingRequest: true,
    };
  case CREATE_NEW_REQUEST_SUCCESS:
    return {
      ...state,
      creatingRequest: false,
      request: action.newRequest,
      requests: [action.newRequest, ...state.requests],
      openRequestsCount: state.openRequestsCount + 1,
      errors: []
    };
  case CREATE_NEW_REQUEST_FAILURE:
    return {
      ...state,
      creatingRequest: false,
      errors: [...action.error]
    };
  case FETCH_USER_REQUEST_DETAILS:
    return {
      ...state,
      fetchingRequest: true,
    };
  case FETCH_USER_REQUEST_DETAILS_SUCCESS:
    return {
      ...state,
      fetchingRequest: false,
      requestData: action.requestData
    };
  case   FETCH_USER_REQUEST_DETAILS_FAILURE:
    return {
      ...state,
      fetchingRequest: false,
      errors: action.error
    };
  case EDIT_REQUEST:
    return {
      ...state,
      editingRequest: true,
    };
  case EDIT_REQUEST_SUCCESS:
    editedRequestIndex = state.requests.findIndex((request) => {
      request.id === action.updatedRequest.id; });
    return {
      ...state,
      editingRequest: false,
      requests: [
        ...state.requests.slice(0, editedRequestIndex),
        action.updatedRequest,
        ...state.requests.slice(editedRequestIndex+1)
      ],
      editRequestError: null
    };
  case EDIT_REQUEST_FAILURE:
    return {
      ...state,
      editingRequest: false,
      editRequestError: action.error
    };
  default: return state;
  }
};

export default requests;
