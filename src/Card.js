const Card = props => {
    const { id, clicked, handleClicked, value } = props;
    return (
        <div 
            className={clicked ? "card clicked" : "card"}
            onClick={() => handleClicked(id)}
        >{id}</div>
    )
}

export default Card