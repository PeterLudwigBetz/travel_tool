// import * as actionTypes from '../../constants';
import notificationReducer from '../notifications';
import * as actionTypes from '../../constants/actionTypes';

const res = [
  {
    createdAt: '2018-09-18T18:53:18.788Z',
    id: 'BUR2H8uoLB',
    message: 'created a new travel request',
    notificationLink: '/request/KIcWEiP2q',
    notificationStatus: 'unread',
    notificationType: 'pending',
    recipientId: '-L32Kw-c5HU',
    senderId: '-L32Kw-c5HU',
    senderImage: 'link',
    senderName: 'Nella Omnibus',
    updatedAt: '2018-09-18T18:53:18.788Z'
  },
  {
    createdAt: '2018-09-18T18:53:18.788Z',
    id: 'BUR2H8uoLB',
    message: 'created a new travel request',
    notificationLink: '/request/KIcWEiP2q',
    notificationStatus: 'unread',
    notificationType: 'pending',
    recipientId: '-L32Kw-c5HU',
    senderId: '-L32Kw-c5HU',
    senderImage: 'link',
    senderName: 'Nella Omnibus',
    updatedAt: '2018-09-18T18:53:18.788Z'
  }
];
describe('Notifications Reducer', () => {
  const initialState = {
    notifications: [],
  };

  it('should return proper initial state', done => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('dispatches action FETCH_NOTIFICATIONS', done => {
    const action = {
      type: 'FETCH_NOTIFICATIONS'
    };
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  it('dispatches action FETCH_NOTIFICATIONS_SUCCESS:', done => {
    const action = {
      type: 'FETCH_NOTIFICATIONS_SUCCESS',
      notifications: res,
    };
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(res);
    done();
  });

  it('dispatches action FETCH_NOTIFICATIONS_FAILURE', done => {
    const action = {
      type: 'FETCH_NOTIFICATIONS_FAILURE',
      error: 'Possible network error, please reload the page'
    };
    const newState = notificationReducer(initialState, action);
    expect(newState.error).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('dispatches action ADD_NOTIFICATION', done => {
    const action = {
      type: 'ADD_NOTIFICATION',
      notification: res[0],
    };
    const newState = notificationReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  // it('dispatches action ADD_NOTIFICATION_SUCCESS:', done => {
  //   const action = {
  //     type: 'ADD_NOTIFICATION_SUCCESS',
  //     notification: res[1],
  //   };
  //   const newState = notificationReducer(initialState, action);
  //   console.log(newState.notification)
  //   expect(newState[0]).toEqual(true);
  //   done();
  // });

  it('dispatches action ADD_NOTIFICATION_FAILURE', done => {
    const action = {
      type: 'ADD_NOTIFICATION_FAILURE',
      error: 'Possible network error, please reload the page'
    };
    const newState = notificationReducer(initialState, action);
    expect(newState.error).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });
});
