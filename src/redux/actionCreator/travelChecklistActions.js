import {
  CREATE_TRAVEL_CHECKLIST,
  CREATE_TRAVEL_CHECKLIST_SUCCESS,
  CREATE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
  DELETE_TRAVEL_CHECKLIST,
  DELETE_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST_FAILURE,
} from '../constants/actionTypes';

export const createTravelChecklist = (checklistItemData) => ({
  type: CREATE_TRAVEL_CHECKLIST,
  checklistItemData
});

export const createChecklistSuccess = (checklistItem) => ({
  type: CREATE_TRAVEL_CHECKLIST_SUCCESS,
  checklistItem,
});

export const createChecklistFailure = (error) => ({
  type: CREATE_TRAVEL_CHECKLIST_FAILURE,
  error,
});

// export const fetchTravelChecklist = (query) => ({
//   type: FETCH_TRAVEL_CHECKLIST,
//   query
// });

// export const fetchTravelChecklistSuccess = (checklistItems) => ({
//   type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
//   checklistItems
// });

// export const fetchTravelChecklistFailure = (error) => ({
//   type: FETCH_TRAVEL_CHECKLIST_FAILURE,
//   error
// });

export const updateTravelChecklist = ({checklistItemId, checklistItemData}) => ({
  type: UPDATE_TRAVEL_CHECKLIST,
  checklistItemId,
  checklistItemData
});

export const updateChecklistSuccess = (updatedChecklistItem, checklistItemId) => ({
  type: UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  updatedChecklistItem,
  checklistItemId
});

export const updateChecklistFailure = (error) => ({
  type: UPDATE_TRAVEL_CHECKLIST_FAILURE,
  error,
});

export const fetchTravelChecklist = (requestId) => ({
  type: FETCH_TRAVEL_CHECKLIST,
  requestId
});

export const fetchTravelChecklistSuccess = (response) => ({
  type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
  travelChecklists: response.travelChecklists
});

export const deleteTravelChecklist = (checklistItemId, deleteReason) => ({
  type: DELETE_TRAVEL_CHECKLIST,
  checklistItemId,
  deleteReason
});

export const deleteChecklistSuccess = (checklistItemId) => ({
  type: DELETE_TRAVEL_CHECKLIST_SUCCESS,
  checklistItemId,
});

export const deleteChecklistFailure = (error) => ({
  type: DELETE_TRAVEL_CHECKLIST_FAILURE,
  error,
});


export const fetchTravelChecklistFailure = (error) => ({
  type: FETCH_TRAVEL_CHECKLIST_FAILURE,
  error
});

