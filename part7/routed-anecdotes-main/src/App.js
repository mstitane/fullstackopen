import { useState } from 'react'
import Menu from './component/Menu'
import AnecdoteList from './component/AnecdoteList'
import About from './component/About'
import CreateNew from './component/CreateNew'
import Footer from './component/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Anecdote from './component/Anecdote'

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2
		}
	])

	const [notification, setNotification] = useState('')

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
		setNotification(`a new anecdote ${anecdote.content} created!`)
		setTimeout(()=> setNotification(''), 5000)
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	return (
		<Router>
			<div>
				<h1>Software anecdotes</h1>
				<Menu/>
				{notification}
				<Routes>
					<Route path="/about" element={<About/>}/>
					<Route path="/create" element={<CreateNew addNew={addNew} showNo />}/>
					<Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
					<Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>}/>
				</Routes>
				<Footer/>
			</div>
		</Router>
	)
}

export default App
