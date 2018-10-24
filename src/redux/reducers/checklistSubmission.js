import { POST_SUBMISSION, FETCH_SUBMISSION,
  POST_SUBMISSION_SUCCESS, POST_SUBMISSION_FAILURE, FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_FAILURE, DOWNLOAD_SUBMISSION } from  '../constants/actionTypes';

const initialState = {
  isUploading: false,
  isFetching: false,
  isDownloading: false,
  postFail: '',
  postSuccess: '',
  fetchFailureMessage: '',
  fetchSuccessMessage: '',
  submissions: '',
};

const submissions = (state=initialState, action)=>{
  switch(action.type){
  case POST_SUBMISSION:
    return {
      ...state,
      isUploading: true
    };
  case POST_SUBMISSION_SUCCESS:
    return {
      ...state,
      postSuccess: action.message,
      successStatus: action.success
    };
  case POST_SUBMISSION_FAILURE:
    return {
      ...state,
      postFail: action.message,
      successStatus: action.success
    };
  case FETCH_SUBMISSION:
    return {
      ...state,
      isFetching: true
    };
  case FETCH_SUBMISSION_SUCCESS:
    return {
      ...state,
      fetchSuccessMessage: action.message,
      submissions: action.submissions
    };
  case FETCH_SUBMISSION_FAILURE:
    return {
      ...state,
      fetchFailureMessage: action.message,
      submission: 'failed'
    };
  case DOWNLOAD_SUBMISSION:
    return {
      ...state,
      isDownloading: true
    };
  default:
    return state;
  }
};

export default submissions;
