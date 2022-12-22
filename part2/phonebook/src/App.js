import {Component, useState, useEffect} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
    }, [])
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
