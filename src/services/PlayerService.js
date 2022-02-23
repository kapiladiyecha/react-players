import Axios from 'axios'

const BASE_URI = `http://localhost:8080/api/csv`

const loadPlayers = () => {
	return Axios({
		method: 'get',
		url: `${BASE_URI}/players`
	})
}

const uploadPlayers = (data) => {
	return Axios({
		method: 'post',
		url: `${BASE_URI}/upload`,
		data,
		headers: { 'Content-Type': 'multipart/form-data' }
	})
}

const downloadPlayers = () => {
	return Axios({
		method: 'get',
		url: `${BASE_URI}/download`,
		headers: { 'Content-Type': 'multipart/form-data' }
	})
}

export default {
	loadPlayers,
	uploadPlayers,
	downloadPlayers
}
