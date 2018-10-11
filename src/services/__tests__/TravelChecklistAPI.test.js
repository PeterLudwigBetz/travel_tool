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
  });

  it('should send a put request to delete a travelchecklist item with reason', async () => {
    const checklistItemId = '3';
    const data = {
      deleteReason: 'No longer applicable'
    };

    moxios.stubRequest(`${baseUrl}/checklists/${checklistItemId}`, {
      status: 200,
      response: 'Checklist item deleted successfully'
    });

    const response = await TravelChecklistAPI.deleteChecklistItem({checklistItemId, data});

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/checklists/${checklistItemId}`);
    expect(response.data).toEqual('Checklist item deleted successfully');
  });
});