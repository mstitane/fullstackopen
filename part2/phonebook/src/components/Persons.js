import Person from "./Person";

const Persons = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <div>
                {props.persons.map((person) =>
                    <Person key={person.name} person={person}/>
                )}
            </div>
        </div>
    )
}

export default Persons