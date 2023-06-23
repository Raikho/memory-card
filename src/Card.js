

const Card = props => {
    const { id, value, clicked, handleClicked } = props;
    return (
        <div 
            className={clicked ? "card clicked" : "card"}
            onClick={() => handleClicked(id)}
        >{value}</div>
    )
}

export default Card