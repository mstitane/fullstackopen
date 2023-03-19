import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'filter',
	initialState: '',
	reducers: {
		filterChange (state, action) {
			return state = action.payload
		}
	},
})

export const { filterChange } = slice.actions
export default slice.reducer