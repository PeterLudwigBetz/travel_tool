import socketIOClient from 'socket.io-client';

const socket = () => socketIOClient('http://127.0.0.1:5000');
const io = socketIOClient('http://127.0.0.1:5000');


export function createRequestSocket(data, cb) {
  io.emit('createRequest', data, cb);
}

export function doStuff(data, cb) {
  io.emit('doStuff', data, cb);
}

export function handleManagerNotification() {
  io.on('createRequest', (data) => console.log('createRequest handled and got this data > ', data));
}

export default socket;
