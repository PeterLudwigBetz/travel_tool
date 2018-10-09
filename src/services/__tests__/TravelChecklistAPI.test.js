import moxios from 'moxios';
import TravelChecklistAPI from '../travelChecklistAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('TravelChecklistAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send `GET` request to fetch travelChecklists', async () => {
    moxios.stubRequest(`${baseUrl}/checklists`, {
      status: 200,
      response: { travelChecklists: [] }
    });

    const response = await TravelChecklistAPI
      .getAllChecklists();
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/checklists`);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ travelChecklists: [] });
    // done();
  });

  it(`should send 'GET' request to
    fetch travelChecklists for specified requestId`, async () => {
    moxios.stubRequest(`${baseUrl}/checklists?requestId=request-test-id`, {
      status: 200,
      response: { travelChecklists: [] }
    });

    const response = await TravelChecklistAPI
      .getAllChecklists('request-test-id');
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/checklists?requestId=request-test-id`);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ travelChecklists: [] });
    // done();
  });
});
