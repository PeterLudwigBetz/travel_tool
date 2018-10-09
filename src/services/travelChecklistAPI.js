import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class travelChecklistAPI {

  static updateChecklistItem(checklistItemData, checklistItemId) {
    return axios.put(`${baseUrl}/checklist/${checklistItemId}`, checklistItemData);
  }

}

export default travelChecklistAPI;
