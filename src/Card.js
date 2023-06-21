

const Card = props => {
    const { value, clicked } = props;
    return (
        <div className={clicked ? "card clicked" : "card"}>{value}</div>
    )
}

export default Card