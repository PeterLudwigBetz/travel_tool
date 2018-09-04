import React from 'react';
import Cookie from 'cookies-js';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from '../NavBar';

// describe what we are testing
describe('Render NavBar component', () => {
  const props = {
    onNotificationToggle: jest.fn(),
    avatar: 'avatar',
    history: {
      push: jest.fn()
    },
    openSearch: true,
    handleHideSearchBar: jest.fn(),
    user: {
      UserInfo: {
        name: 'Tomato Jos',
        picture: 'http://picture.com/gif'
      }
    },
  };
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the navbar as expected', () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('should render the OnNotification click as exepected', () => {
    const wrapper = shallow(<NavBar {...props} />);
    let NotificationToggleSpy = jest.spyOn(
      wrapper.instance().props,
      'onNotificationToggle'
    );
    wrapper
      .find('#notification')
      .first()
      .simulate('click');
    expect(NotificationToggleSpy).toHaveBeenCalled();
  });

  it('should log user out when the logout link is clicked', () => {
    const wrapper = shallow(<NavBar {...props} />);
    wrapper.find('#logout').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  });

  it('should should be search bar for phone view toggle display', () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('should log user out when the logout link is clicked', () => {
    const wrapper = shallow(<NavBar {...props} />);
    wrapper.find('#logout').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  });

  it('should render dropdown items contain logout link when button is clicked', ()=>{
    const wrapper = mount(<NavBar {...props} />);
    expect(wrapper.state('hideLogoutDropdown')).toBe(true);
    wrapper.find('#demo-menu-lower-right').simulate('click');
    expect(wrapper.state('hideLogoutDropdown')).toBe(false);
  });

  it('should hide  logout Dropdown when dropdown button is clicked twice', ()=>{
    const wrapper = mount(<NavBar {...props} />);
    wrapper.instance().hideDropdown();
    expect(wrapper.state('hideLogoutDropdown')).toBe(true);
  });

});
