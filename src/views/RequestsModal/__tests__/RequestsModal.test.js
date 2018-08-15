import React from 'react';
import { shallow } from 'enzyme';
import RequestsModal from '../RequestsModal';

// describe what we are testing
describe('Render RequestsModal component', () => {
  // const props = {
  //   onNotificationToggle: jest.fn(),
  //   avatar: 'avatar'
  // };
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = shallow(<RequestsModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the RequestsModal as expected', () => {
    const wrapper = shallow(<RequestsModal />);
    expect(wrapper.length).toBe(1);
  });

  // it('should render the OnNotification click as exepected', () => {
  //   const wrapper = shallow(<NavBar {...props} />);
  //   let NotificationToggleSpy = jest.spyOn(
  //     wrapper.instance().props,
  //     'onNotificationToggle'
  //   );
  //   wrapper
  //     .find('#notification')
  //     .first()
  //     .simulate('click');
  //   expect(NotificationToggleSpy).toHaveBeenCalled();
  // });
});
