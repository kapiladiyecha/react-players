import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import LibraryMenu from '../components/library/LibraryMenu'
import libraries from './mock'
import { Menu } from 'antd'

const { SubMenu } = Menu

configure({ adapter: new Adapter() })
describe('LibraryMenu', () => {
	it('shoud render with data', () => {
		const handleMenuClick = jest.fn()
		const wrapper = mount(<LibraryMenu libraries={libraries} handleMenuClick={handleMenuClick} />)
		expect(wrapper.find(Menu)).toHaveLength(1)
		expect(wrapper.find(SubMenu)).toHaveLength(16)
	})
})
