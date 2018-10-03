import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedAccommodation,{ Accommodation } from '../index';

const props = {
  createAccommodation: jest.fn(),
  shouldOpen: false,
  modalType: null,
  openModal: jest.fn(),
  onNotificationToggle: jest.fn(),
  closeModal: jest.fn(),
};

const initialState = {
  postAccommodationData: [],
  errors: [],
  modal: {
    shouldOpen: false,
    modalType: null
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <ConnectedAccommodation {...props} />
    </MemoryRouter>
  </Provider>
);

describe('<Accommodation>', () => {
  it('should render the Accommodation page without crashing', () => {
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
