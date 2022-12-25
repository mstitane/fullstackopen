const Person = (props) => {
    let person = props.person;
    return (
        <p>
            {person.name} {person.number}
            <button onClick={() => props.onDelete(person.id)}>delete</button>
        </p>
    )
}
export default Person