import React from 'react';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ConnectedChecklist, { Checklist, mapStateToProps } from '../index';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';

travelChecklistMockData[0].destination = 'Nairobi';
const props = {
  openModal: jest.fn(),
  closeModal: jest.fn(),
  createTravelChecklist: jest.fn(),
  fetchTravelChecklist: jest.fn(),
  shouldOpen: false,
  modalType: '',
  checklistItems: travelChecklistMockData,
  currentUser: { location: 'Nairobi' },
  isLoading: false
};

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        name: 'Tomato Jos',
        picture: 'http://picture.com/gif'
      }
    }
  },
  requestsReducer: {
    requests: [],
    request: {},
    loading: false,
    errors: []
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  getCurrentUserRole: 'tomato',
  travelChecklist: { checklistItems: travelChecklistMockData }
};

let shallowWrapper, mountWrapper;
beforeEach(() => {
  shallowWrapper = shallow( <Checklist {...props} />);
  mountWrapper = mount(
    <Provider>
      <MemoryRouter>
        <Checklist {...props} />
      </MemoryRouter>
    </Provider>
  );
});

describe('<Checklist> component', () => {
  it('should render the Checklist page without crashing', () => {
    expect(shallowWrapper.length).toBe(1);
  });
  it('renders loading indicator if `isLoading is true`', () => {
    const wrapper = shallowWrapper;
    wrapper.setProps({ isLoading: true});
    expect(wrapper.find('#loading').length).toBe(1);
  });
  it('should render the right number of checklist items', () => {
  });

  it('maps state to props and return the expected object', () => {
    const modal = {
      modal: {
        shouldOpen: false,
        modalType: null
      }
    };
    const user = {
      currentUser: {},

    };
    const travelChecklist = {
      isLoading: false,
      checklistItems: travelChecklistMockData
    };
    const props = mapStateToProps({ modal, user, travelChecklist });
    expect(props).toEqual({
      ...modal.modal,
      checklistItems: travelChecklist.checklistItems,
      currentUser: user.currentUser,
      isLoading: travelChecklist.isLoading
    });
  });
});
