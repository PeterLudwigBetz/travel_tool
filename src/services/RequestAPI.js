import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class RequestAPI {
  static getUserRequests(query) {
    return axios.get(`${baseUrl}/requests${query}`);
  }

  static getUserRequestDetails(requestId) {
    return axios.get(`${baseUrl}/requests/${requestId}`);
  }
  static postNewRequest(requestData) {
    return axios.post(`${baseUrl}/requests`, requestData);
  }
  static editRequest(requestId, requestData) {
    // console.log('I am called');
    return axios.put(`${baseUrl}/requests/${requestId}`, requestData);
  }
}

export default RequestAPI;
