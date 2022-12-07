import {useState} from 'react'

const Header = (props) => {
    return (<h1>{props.title}</h1>)
}
const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}
const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad;
    if (all === 0)
        return (
            <div>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                <StatisticLine text="good" value={props.good}/>
                <StatisticLine text="neutral" value={props.neutral}/>
                <StatisticLine text="bad" value={props.bad}/>
                <StatisticLine text="all" value={all}/>
                <StatisticLine text="average" value={((props.good * 1) + (props.bad * -1)) / all}/>
                <StatisticLine text="positive" value={((props.good / all) * 100).toFixed(1) + ' %'}/>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header title={"Give feedback"}/>
            <Button handleClick={() => setGood(good + 1)} text="good"/>
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
            <Button handleClick={() => setBad(bad + 1)} text="bad"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App