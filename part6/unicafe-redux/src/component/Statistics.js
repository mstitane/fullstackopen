import StatisticLine from "./StatisticLine";

const Statistics = ({ state }) => {
  let all = Object.values(state).reduce((a, b) => a + b, 0);
  if (all === 0)
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={state.good} />
          <StatisticLine text="ok" value={state.ok} />
          <StatisticLine text="bad" value={state.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine
            text="average"
            value={(state.good * 1 + state.bad * -1) / all}
          />
          <StatisticLine
            text="positive"
            value={((state.good / all) * 100).toFixed(1) + " %"}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
