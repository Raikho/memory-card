const Stats = props => {
    const { score, streak } = props;
    return (
        <div className="stats">
          <div className="score">{`Score: ${score}`}</div>
          <div className="streak">{`Streak: ${streak}`}</div>
        </div>
    );
}

export default Stats