import axios from 'axios';
// import socketIOClient from 'socket.io-client';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class Notitifications {
  static getUserNotification(userId) {
    return axios.get(`${baseUrl}/notifications/${userId}`);
  }

}

export default Notitifications;
