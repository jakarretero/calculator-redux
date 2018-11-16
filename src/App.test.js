import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from "enzyme";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should render without crashing", () => {
	const wrapper = shallow(<App/>);
	expect(wrapper.exists()).toBe(true);
})

it("should render plus sign after click on plus button", () => {
  const wrapper = shallow(<App/>);
  wrapper.find('#plus').simulate("click");
  expect(wrapper.find("#operator").text()).toBe('+');
});

it("should plus numbers", () => {
	const wrapper = shallow(<App/>);
	wrapper.find('#btn4').simulate("click");
	wrapper.find('#plus').simulate("click");
	wrapper.find('#btn5').simulate("click");
	wrapper.find('#calculate').simulate("click");
	expect(wrapper.find("#result").prop('value')).toBe(9);
});