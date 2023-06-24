const Header = props => {
    const { numImages, hasWon, handleReset } = props;
    return (
        <div className="header">
            <div className="title">Memory Game</div>
            {hasWon ?
                <div className="win-container">
                    <div className="instructions">You selected all {numImages}!</div>
                    <button onClick={handleReset}>Reset</button>
                </div> :
                <div className="instructions">
                    Select an different image every round, avoiding images you've already clicked. Try to get all {numImages}!
                </div>
            }
        </div>
    )
}

export default Header