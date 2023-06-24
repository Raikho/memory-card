const Card = props => {
    const { id, clicked, handleClicked, value } = props;
    return (
        <div 
            className={clicked ? "card clicked" : "card"}
            onClick={() => handleClicked(id)}
        >
            <img 
                src={require(`./assets/${value}.jpg`)}
                alt={'bird' + (id)}
            />
        </div>
    )
}

export default Card