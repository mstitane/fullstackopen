import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './reducers/AnecdoteReducer'
import filterReducer from './reducers/FilterReducer'
import notificationReducer from './reducers/NotificationReducer'
import anecdotesService from './services/anecdotes'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer
	}
})

anecdotesService.getAll().then(anecdotesList => {
	store.dispatch(setAnecdotes(anecdotesList))
})

export default store