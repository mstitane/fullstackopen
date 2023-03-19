import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initialize } from './reducers/AnecdoteReducer'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initialize())
	}, [dispatch])
	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification/>
			<Filter/>
			<AnecdoteList/>
			<AnecdoteForm/>
		</div>
	)
}

export default App