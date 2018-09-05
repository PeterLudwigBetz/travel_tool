import React from 'react';
import Cookie from 'cookies-js';
import { Login } from '../Login';
import TextLink from '../../../components/TextLink/TextLink';

const props = {
  setCurrentUser: () => {},
  isAuthenticated: true,
  history: {
    push: jest.fn()
  },
};

const wrapper = shallow(<Login {...props} />);

describe('Login Component', () => {
  it('should render Login page correctly', () => {
    expect(wrapper.find(TextLink)).toHaveLength(2);
    expect(wrapper.find('#login')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(2);
    expect(wrapper.find('p')).toHaveLength(1);
  });

  it('should find the Login button', () => {
    expect(wrapper.find('button').exists).toBeTruthy();   
  });

  it('should redirect to andela micro service when login is Clicked', () => {
    const redirectUrl = `${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${process.env.REACT_APP_AUTH_REDIRECT_URL}`;
    window.location.replace = jest.fn();
    wrapper.find('#login').simulate('click');
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
  });

  it('should set user Login status to undefined if user not is authenticated', () => {
    const loginStatus = Cookie.get('login-status');
    expect(loginStatus).toEqual(undefined);
  });

  it('should set user Login status to true if user is authenticated', () => {
    const token = 'TOKEN';
    Cookie.set('jwt-token', token);
    shallow(<Login {...props} />);
    const loginStatus = Cookie.get('login-status');
    expect(loginStatus).toEqual(undefined);
  });
});


