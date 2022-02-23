import React, { useEffect } from 'react'
import { Layout, Skeleton, Table } from 'antd'
import PlayerService from '../../services/PlayerService'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlayers, updateLoading } from '../../store/playerSlice'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const { Header, Content } = Layout

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Height',
		dataIndex: 'height',
		key: 'height',
		render: (text) => `${text} in`
	},
	{
		title: 'Playing',
		dataIndex: 'playing',
		key: 'playing',
		render: (playing) => (playing ? <CheckOutlined /> : <CloseOutlined />)
	}
]

const Players = () => {
	const { players, isLoading } = useSelector((state) => state)
	const dispatch = useDispatch()

	const retrievePlayers = () => {
		dispatch(updateLoading(true))
		PlayerService.loadPlayers()
			.then(({ data }) => {
				if (data?.length > 0) {
					dispatch(loadPlayers(data))
				}
			})
			.catch((e) => {
				// Track error
				console.log(e)
			})
			.finally(() => {
				dispatch(updateLoading(false))
			})
	}

	useEffect(() => {
		retrievePlayers()
	}, [])

	return (
		<Layout>
			<Header className='header'>Players Collections</Header>
			{isLoading ? (
				<Skeleton />
			) : (
				<Content style={{ padding: 48 }}>
					<Layout>{players?.length > 0 && <Table columns={columns} dataSource={players} />}</Layout>
				</Content>
			)}
		</Layout>
	)
}

export default Players
