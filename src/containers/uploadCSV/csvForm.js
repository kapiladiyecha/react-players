import React, { useState } from 'react'
import { Form, Button, Upload, Alert } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Layout, { Content, Header } from 'antd/lib/layout/layout'
import PlayerService from '../../services/PlayerService'

const CSVForm = () => {
	const [file, setFile] = useState(undefined)
	const [error, setError] = useState(undefined)
	const [success, setSuccess] = useState(undefined)

	const onFinish = async (values) => {
		if (file) {
			try {
				const formData = new FormData()
				formData.append('file', file.originFileObj)
				PlayerService.uploadPlayers(formData)
					.then((res) => {
						setSuccess('Players data has been uploaded')
						setTimeout(() => {
							window.location.reload()
						}, 2000)
					})
					.catch((e) => {
						setError(e)
					})
			} catch (error) {
				console.log(error)
			}
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	const normFile = (e) => {
		console.log('Upload event:', e)
		if (Array.isArray(e)) {
			return e
		}
		if (e && e.fileList) setFile(e && e.fileList[0])
		return e && e.fileList
	}

	const uploadProps = {
		beforeUpload: (file) => {
			const isCSV = file.type === 'text/csv'
			let message = undefined
			if (!isCSV) {
				message = `${file.name} is not a csv file`
			}
			setError(message)
			return isCSV || Upload.LIST_IGNORE
		},
		accept: '.csv',
		action: '',
		customRequest: ({ file, onSuccess }) =>
			setTimeout(() => {
				onSuccess('ok')
			}, 0)
	}

	return (
		<Layout>
			<Header className='header'>Upload Players Data</Header>
			<Content style={{ padding: 48 }}>
				{error && <Alert message={error} description='This is an error about wrong csv file upload' showIcon type='error' closable />}
				{success && <Alert message={success} description='This is success message about correct csv file upload' showIcon type='success' closable />}
				<Form name='basic' labelCol={{ span: 8 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
					<Form.Item>
						<Form.Item name='dragger' valuePropName='fileList' getValueFromEvent={normFile} noStyle>
							<Upload.Dragger name='files' maxCount={1} {...uploadProps}>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>Click or drag file to this area to upload</p>
								<p className='ant-upload-hint'>Support for a single upload.</p>
							</Upload.Dragger>
						</Form.Item>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 11, span: 8 }}>
						<Button type='primary' htmlType='submit' disabled={!file}>
							Upload
						</Button>
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	)
}

export default CSVForm
