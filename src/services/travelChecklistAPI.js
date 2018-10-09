import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelChecklistAPI {
  static getAllChecklists(requestId) {
    const url = (requestId)
      ? `${baseUrl}/checklists?requestId=${requestId}`
      : `${baseUrl}/checklists`;

    return axios.get(url);
  }

  static updateChecklistItem(checklistItemData, checklistItemId) {
    return axios.put(`${baseUrl}/checklist/${checklistItemId}`, checklistItemData);
  }
}

export default TravelChecklistAPI;
