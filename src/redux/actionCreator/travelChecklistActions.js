import {
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS
} from '../constants/actionTypes';

export const updateTravelChecklist = (checklistItemId, checklistItemData) => ({
  type: UPDATE_TRAVEL_CHECKLIST,
  checklistItemId,
  checklistItemData
});

export const updateChecklistSuccess = (updatedChecklistItem) => ({
  type: UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  updatedChecklistItem,
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

export const fetchTravelChecklistFailure = (error) => ({
  type: FETCH_TRAVEL_CHECKLIST_FAILURE,
  error
});
