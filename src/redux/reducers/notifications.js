import { FETCH_USERS_NOTIFICATION_SUCCESS, FETCH_USERS_NOTIFICATION_FAILURE, ADD_USERS_NOTIFICATION_SUCCESS, ADD_USERS_NOTIFICATION_FAILURE } from '../constants/actionTypes';

const notifications = (state=[], action) => {
  switch(action.type){
  case ADD_USERS_NOTIFICATION_SUCCESS:
    return [action.notification, ...state];
  case ADD_USERS_NOTIFICATION_FAILURE:
    return {
      error: true
    };
  case FETCH_USERS_NOTIFICATION_SUCCESS:
    return action.notifications;
  case FETCH_USERS_NOTIFICATION_FAILURE:
    return {
      error: true
    };
  default:
    return state;
  }
};
export default notifications;

