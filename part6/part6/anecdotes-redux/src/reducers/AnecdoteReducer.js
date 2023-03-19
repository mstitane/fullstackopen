import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const slice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		append (state, action) {
			state.push(action.payload)
		},
		vote (state, action) {
			const updatedAnecdote = action.payload
			return state.map(anc => anc.id !== updatedAnecdote.id ? anc : updatedAnecdote)
		},
		setAnecdotes (state, action) {
			return action.payload
		},
	}
})

export const { append, vote, setAnecdotes } = slice.actions

export const initialize = () => {
	return async dispatch => {
		const all = await anecdoteService.getAll()
		dispatch(setAnecdotes(all))
	}
}

export const createNew = content => {
	return async dispatch => {
		const anecdote = await anecdoteService.create(content)
		dispatch(append(anecdote))
	}
}

export const voting = anecdote => {
	return async dispatch => {
		const updated = await anecdoteService.voting(anecdote)
		dispatch(vote(updated))
	}
}

export default slice.reducer