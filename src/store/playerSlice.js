import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
	name: 'player',
	initialState: {
		players: [],
		isLoading: false
	},
	reducers: {
		loadPlayers: (state, action) => {
			state.players = action.payload
		},
		updateLoading: (state, action) => {
			state.isLoading = action.payload
		}
	}
})

// Action creators are generated for each case reducer function
export const { loadPlayers, updateLoading } = playerSlice.actions

export default playerSlice.reducer
