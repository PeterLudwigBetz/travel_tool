import {
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  updatingChecklist: false,
  checklistItems: [],
  error: ''
};

const traveChecklist = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_TRAVEL_CHECKLIST:
    return { ...state, updatingChecklist: true };
  case UPDATE_TRAVEL_CHECKLIST_SUCCESS:
    return { ...state, checklistItems: [...state.checklistItems], updatingChecklist: false };
  case UPDATE_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, updatingChecklist: false, error: action.error };
  default: return state;
  }
};

export default traveChecklist;
