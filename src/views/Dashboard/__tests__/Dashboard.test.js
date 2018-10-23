import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '..';

describe('<Dashboard />', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });
})