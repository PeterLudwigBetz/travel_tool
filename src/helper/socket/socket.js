import socketIOClient from 'socket.io-client';
import Cookies from 'cookies-js';


const socket = () => socketIOClient('http://127.0.0.1:5000');
const io = socketIOClient('http://127.0.0.1:5000');


export function createRequestSocket(data, cb) {
  io.emit('createRequest', data, cb);
}

export function doStuff(data, cb) {
  io.emit('doStuff', data, cb);
}

export function handleManagerNotification(userId) {
  // if this person is the manager log the data
  
  io.on('createRequest', (data) => {
    if (data.recipientId === userId) {
      // console.log('createRequest handled and got this data > ', data);
    }
  });
}

export default socket;
