import axios from 'axios';

import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class SubmissionAPI {
  static postSubmission(submissionData, checkListItemId) {
    return axios.post(`${baseUrl}/checklists/${checkListItemId}/submission`, submissionData);
  }
  static getSubmission(requestId){
    return axios.get(`${baseUrl}/checklists/${requestId}/submission`);
  }
  static downloadSubmission(secureUrl){
    return axios.get(`${secureUrl}`);
  }
}
export default SubmissionAPI;
