import React from 'react';
import { mount} from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import SubmissionFormSets from '../SubmissionFormSets';

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
        <SubmissionFormSets {...props} />
      </Provider>);
    expect(wrapper.find('div.travelCheckList--item__item').length).toBe(1);
  });

  it('should render uploadField', () => {
    props.item.requiresFiles = false;
    wrapper = mount(
      <Provider store={store}>
        <SubmissionFormSets {...props} />
      </Provider>);
    const wrapperInstance = wrapper.instance();
    expect(wrapper.find('input#airline-name').length).toBe(3);
  });

  it('should upload file', () => {
    props.item.requiresFiles = true;
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: [{
          name: 'test.pdf', 
          lastModified: 1517684494000, 
          lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
          size: 481,
        }],
        result: [{
          name: 'test.pdf', 
          lastModified: 1517684494000, 
          lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
          size: 481,
        }]
      }
    };
    const   handleUpload = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <SubmissionFormSets {...props} {...handleUpload} />
      </Provider>);
    wrapper.find('input[name="file"]').simulate('change', event);
    expect(wrapper.find('input#airline-name').length).toBe(3);
  });

  it('should handleDownload', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    let state = {
      uploadPresent: false
    };
    const wrapper = mount(
      <Provider store={store}>
        <SubmissionFormSets {...props} handleDownload={jest.fn()} state={state} />
      </Provider>);
    // wrapper.setState({uploadPresent: true});
    wrapper.setState({uploadPresent: true});
    // const spy = sinon.spy(wrapper.instance(), 'handleDownload');
    wrapper.instance().handleChange(event);
    // shawrapper.setState({uploadPresent: true});
    // wrapper.instance().forceUpdate();
    // expect(spy.calledOnce).toBe(true);
    expect(wrapper.find('div.travelCheckList--input__download-field').length).toBe(3);
  });
});
