import React from 'react';
import { mount,render, shallow} from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import CheckListSubmissionForm from '../CheckListSubmissionForm';
import { travelChecklists, mockRequest  } from '../travelChecklistMockData';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  submissions:{
    submissions:[{
      'value': '{"url":"http://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","secureUrl":"https://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","publicId":"w26o4c86mw4047ttwfld","fileName":"airticket.pdf"}',
      'tripId': '35678',
      'checklistItemId': 7,
      'id': 'St1pYTwhT',
      'updatedAt': '2018-10-22T06:59:12.056Z',
      'createdAt': '2018-10-22T06:59:12.056Z',
      'deletedAt': null
    }],
    successStatus: true
  }});

store.runSagas = sagaMiddleware.run;

let wrapper;
let props = {
  item: {'id': 1,
    'name': 'Visa Application',
    'resources': [{
      'checklistItemId': 1,
      'id':2,
      'label': 'Application guide',
      'link': 'https://google.com/application-guide'
    },
    ],
    'requiresFiles': true,
    'deleteReason': null,
  },
  handleSubmit: jest.fn(),
  handleUpload: jest.fn()
};

describe('<SubmissionFormSets />', () => {
  it('should render correctly', () => {
    wrapper = mount(
      <Provider store={store}>
        <CheckListSubmissionForm trips={[]} requestData={mockRequest} checklistsData={[travelChecklists]} />
      </Provider>);
    expect(wrapper.find('div.travelCheckList__destination-name').length).toBe(2);
  });


});
