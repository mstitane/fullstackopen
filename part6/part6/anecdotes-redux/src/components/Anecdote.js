const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <p>{anecdote.content}</p>
      <p>
        has {anecdote.votes} votes
        <button onClick={handleClick}> Vote</button>
      </p>
    </li>
  )
}
export default Anecdote