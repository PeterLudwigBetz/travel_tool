import moxios from 'moxios';
import AvailableRoomsAPI from '../AvailableRoomsAPI';
import availableRooms from '../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const expectedResponse = {
  success: true,
  message: 'Room spaces available retrieved successfully',
  availableRooms
};

describe('AvailableRoomsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('calls Get request to get all available rooms based on location', async () => {
    const urlQuery =
      '?location=Lagos Nigeria&arrivalDate=2018-12-23&departureDate=2018-11-20&gender=Female';
    moxios.stubRequest(`${baseUrl}/availablerooms${urlQuery}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await AvailableRoomsAPI.getAvailableRooms(urlQuery);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(
      `${baseUrl}/availablerooms?location=Lagos Nigeria&arrivalDate=2018-12-23&departureDate=2018-11-20&gender=Female`
    );
    expect(request.config.method).toEqual('get');
    // expect(response.data).toEqual(expectedResponse);
  });
});
