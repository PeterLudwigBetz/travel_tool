import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelChecklistAPI {
  static getAllChecklists(requestId, destinationName) {
    const url = (requestId || destinationName)
      ? `${baseUrl}/checklists?requestId=${requestId}?destinationName=${destinationName}`
      : `${baseUrl}/checklists`;

    return axios.get(url);
  }

  static createChecklist(checklistItemData) {
    return axios.post(`${baseUrl}/checklist`, checklistItemData);
  }

  static updateChecklistItem(checklistItemData, checklistItemId) {
    return axios.put(`${baseUrl}/checklist/${checklistItemId}`, checklistItemData);
  }

  static deleteChecklistItem({checklistItemId, deleteReason}) {
    return axios.patch(`${baseUrl}/checklists/${checklistItemId}`, deleteReason);
  }

}

export default TravelChecklistAPI;
