import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LeftSideBar from '../index';

describe('<LeftSideBar />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LeftSideBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('changes active navigation link', () => {
    const wrapper = mount(
      <MemoryRouter>
        <LeftSideBar />
      </MemoryRouter>
    );

    const defaultActiveNavItem = {};
    expect(wrapper
      .find(LeftSideBar)
      .instance().state.activeNavItem
    ).toEqual(defaultActiveNavItem);

    wrapper.find('.nav-link').at(0).simulate('click');
    const newState = wrapper.find(LeftSideBar).instance().state;
    expect(newState.activeNavItem).not.toEqual(defaultActiveNavItem);
  });
});
