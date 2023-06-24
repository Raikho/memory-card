const Stats = props => {
    const { score, streak } = props;
    return (
        <div className="stats">
          <div className={(score === 0) ? 'score new' : 'score'}>
            {`Score: ${score}`}
          </div>
          <div className="streak">{`Streak: ${streak}`}</div>
        </div>
    );
}

export default Stats