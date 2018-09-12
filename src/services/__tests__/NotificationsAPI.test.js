import moxios from 'moxios';
import NotificationsAPI from '../NotificationsAPI';
import { notifications } from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('NotificationsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a GET request to retrieve users notifications', async () => {
    moxios.stubRequest(`${baseUrl}/notifications`, {
      status: 200,
      response: [{
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
      }]
    });

    const response = await NotificationsAPI.getNotifications();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/notifications`);
    expect(response.data).toEqual(notifications);
  });
});
