import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Button, Menu } from 'antd'
import { Provider } from 'react-redux'
import Players from './containers/players/Players'
import store from './store/store'
import CSVForm from './containers/uploadCSV/csvForm'
import { DownloadOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'

import 'antd/dist/antd.css'
import './App.scss'

function App() {
	return (
		<Provider store={store}>
			<div>
				<Menu mode='horizontal'>
					<Menu.Item key='players'>
						<Button type='link' href='players' icon={<UserOutlined />} size='small'>
							Players
						</Button>
					</Menu.Item>
					<Menu.Item key='upload-csv'>
						<Button type='link' href='upload-csv' icon={<UploadOutlined />} size='small'>
							Upload CSV
						</Button>
					</Menu.Item>
					<Menu.Item key='download-csv'>
						<Button type='link' href='http://localhost:8080/api/csv/download' icon={<DownloadOutlined />} size='small'>
							Download
						</Button>
					</Menu.Item>
				</Menu>

				<div className='container mt-3'>
					<Switch>
						<Route exact path={['/', '/players']} component={Players} />
						<Route exact path={['/upload-csv']} component={CSVForm} />
					</Switch>
				</div>
			</div>
		</Provider>
	)
}

export default App
