import axios from 'axios';
// import socketIOClient from 'socket.io-client';
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
    // const socket = socketIOClient('127.0.0.1:5000/socket');
    // socket.emit('change color', 'red');
    return axios.post(`${baseUrl}/requests`, requestData);
  }
}

export default RequestAPI;
