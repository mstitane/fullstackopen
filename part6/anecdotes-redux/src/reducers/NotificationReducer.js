import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		showNotification (state, action) {
			return action.payload
		},
		clearNotification () {
			return null
		}
	},
})

export const { showNotification, clearNotification } = slice.actions

export const setNotification = (text, duration) => {
	return async dispatch => {
		dispatch(showNotification(text))
		setTimeout(() => {
			dispatch(clearNotification())
		}, duration * 1000)
	}
}
export default slice.reducer