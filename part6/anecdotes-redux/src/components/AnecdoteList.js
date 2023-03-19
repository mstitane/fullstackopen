import { useDispatch, useSelector } from 'react-redux'
import { voting } from '../reducers/AnecdoteReducer'
import Anecdote from './Anecdote'
import { setNotification } from '../reducers/NotificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		let list

		if (filter !== '')
			list = anecdotes.filter(a => a.content.includes(filter))
		else
			list = anecdotes

		return [...list].sort((a, b) => b.votes - a.votes)
	})

	const voteHandler = (anecdote) => {
		dispatch(voting(anecdote))
		dispatch(setNotification(`Voted for '${anecdote.content}'`, 10))
	}

	return (
		<div>
			<ul>
				{
					anecdotes.map(anc =>
						<Anecdote
							key={anc.id}
							anecdote={anc}
							handleClick={() => voteHandler(anc)}
						/>
					)
				}
			</ul>
		</div>
	)
}

export default AnecdoteList