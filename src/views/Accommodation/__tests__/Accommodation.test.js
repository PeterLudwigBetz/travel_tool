import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedAccommodation, { Accommodation } from '..';
import guestHouses from '../__mocks__/mockData/guestHouses';

const props = {
  guestHouses,
  fetchAccommodation: sinon.spy(),
  isLoading: false,
  createAccommodation: jest.fn(),
  shouldOpen: false,
  modalType: null,
  openModal: jest.fn(),
  onNotificationToggle: jest.fn(),
  closeModal: jest.fn(),
  getCurrentUserRole: 'Travel Administrator',
  history: {
    push: jest.fn()
  },
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

describe('<Accommodation />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Accommodation {...props} />);
  });

  it('should render the Accommodation page without crashing', () => {
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
  

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls the fetchAccommodation method
      on componentDidMount`, () => {
    const { fetchAccommodation } = props;
    expect(fetchAccommodation.called).toEqual(true);
  });

  it('renders the right number of centres', () => {
    const CentreGridWrapper = wrapper.find('WithLoading').dive()
      .find('CentreGrid');
    expect(CentreGridWrapper.dive().find('CentreCard').length).toBe(4);
  });

  xit('should redirect the user when the  user is not a super admin admin  or travel adminon componentDidMount method', () => {
    const { history } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Accommodation {...{ ...props, getCurrentUserRole: ' Administrator' }} />
        </MemoryRouter>
      </Provider>
    );
    expect(history.push).toHaveBeenCalledWith('/');
    wrapper.unmount();
  });



});
