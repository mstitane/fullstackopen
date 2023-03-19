import { useSelector } from 'react-redux'

const Notification = () => {
	let notification = useSelector(({ anecdotes, filter, notification }) => {
		return notification
	})
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		backgroundColor: 'rgb(160,238,82)'
	}

	if (!notification) return (<div/>)
	return (
		<div>
			<div style={style}>
				{notification}
			</div>
			<br/>
		</div>

	)
}

export default Notification