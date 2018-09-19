import socketIOClient from 'socket.io-client';
import {addUsersNotification} from '../../redux/actionCreator/notificationsActions';
import store from '../../redux/store/store';

const io = socketIOClient('http://127.0.0.1:5000');


export default function handleManagerNotification(userId) {
  io.on('notification', (data) => {
    if (data.recipientId === userId) {
      store.dispatch(addUsersNotification(data));
    }
  });
}

