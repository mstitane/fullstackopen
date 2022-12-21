import {Component, useState} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import person from "./components/Person";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Yassine Bono', number: '040-123456', id: 1},
        {name: 'Hakim Zyach', number: '39-44-5323523', id: 2},
        {name: 'Achraf hakimi', number: '12-43-234345', id: 3},
        {name: 'Walid regragui', number: '39-23-6423122', id: 4},
        {name: 'Azzedine ounahi', number: '061-9307533', id: 5},
        {name: 'Mohammed STITANE', number: '061-9307533', id: 6}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const found = persons.filter(p => p.name === newName).length > 0;
        if (found)
            alert(`${newName} is already added to phonebook`)
        else {
            let newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(newPerson))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChanged = (event) => setNewName(event.target.value)
    const handleNumberChanged = (event) => setNewNumber(event.target.value)
    const handleFilterChanged = (event) => setNewFilter(event.target.value)

    const filteredPersons = newFilter.length > 0 ? persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())) : persons
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} onChange={handleFilterChanged}/>
            <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChanged}
                        numberValue={newNumber} onNumberChange={handleNumberChanged}/>
            <Persons persons={filteredPersons}/>
        </div>
    )
}
export default App;
