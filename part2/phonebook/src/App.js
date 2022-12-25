import {useState, useEffect} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState({text: null, type: null})
    const SUCCESS = 'SUCCESS';
    const ERROR = 'ERROR';


    useEffect(() => {
        personsService
            .getAll()
            .then(persons => setPersons(persons))
    }, [])

    const addNewPerson = (name, number) => {
        let newPerson = {
            name: name,
            number: number,
            id: persons.length + 1
        }
        personsService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                fireMessage(`Added ${returnedPerson.name}`, SUCCESS)
            })
    }

    const updatePerson = (person, number) => {
        let newPerson = {...person, number: number}
        let id = newPerson.id;
        personsService
            .update(id, newPerson)
            .then(returnedPerson => {
                setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
                fireMessage(`Updated ${returnedPerson.name}`, SUCCESS);
            }).catch(error => {
                fireMessage(`Information of ${newPerson.name} has already been removed`, ERROR)
            })
    }

    const addPerson = (event) => {
        event.preventDefault()
        const person = persons.find(p => p.name === newName);
        if (person !== undefined) {
            if (person.number !== newNumber) {
                let ok = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one `)
                if (ok)
                    updatePerson(person, newNumber);
            } else
                alert(`${newName} is already added to phonebook`)
        } else {
            addNewPerson(newName, newNumber);
        }
        setNewName('')
        setNewNumber('')
    }

    function fireMessage(message, type) {
        setErrorMessage({text: message, type: type})
        setTimeout(() => {
            setErrorMessage({text: null, type: null})
        }, 5000)
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id);
        let ok = window.confirm(`Delete ${person.name} ?`);
        if (ok) personsService
            .deletePerson(id)
            .then(response => {
                setPersons(persons.filter(n => n.id !== id))
                fireMessage(`Deleted ${person.name}`, SUCCESS);
            })
    }

    const handleNameChanged = (event) => setNewName(event.target.value)
    const handleNumberChanged = (event) => setNewNumber(event.target.value)
    const handleFilterChanged = (event) => setNewFilter(event.target.value)

    const filteredPersons = newFilter.length > 0 ? persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())) : persons
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage}/>
            <Filter value={newFilter} onChange={handleFilterChanged}/>
            <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChanged}
                        numberValue={newNumber} onNumberChange={handleNumberChanged}/>
            <Persons persons={filteredPersons} onDelete={deletePerson}/>
        </div>
    )
}
export default App;
