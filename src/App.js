import React, { useState, useEffect } from 'react'
import DisplayTitle from './components/DisplayTitle'
import FilterForm from './components/FilterForm'
import Form from './components/Form'
import Numbers from './components/Numbers'
import personService from './services/persons'

const Notification = ({ notificationClass, message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={notificationClass}>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState({})

    const initialPhonebookHook = () => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }

    useEffect(initialPhonebookHook, [])

    const personAlreadyExists = () => {
        return persons.find(p => p.name === newName)
    }

    const handleOnSubmit = event => {
        event.preventDefault()
        const personObject = {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        }

        const personExists = personAlreadyExists()
        if (!personExists) {
            personService.create(personObject)
                .then(createPerson => {
                    setPersons(persons.concat(personObject))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage({ className: 'success', message: `Added '${personObject.name}'` })
                    setTimeout(() => {
                        setNotificationMessage({})
                    }, 5000)
                })
        } else {
            window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            personService.update(personExists.id, personObject)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.id !== personExists.id ? p : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage({ className: 'success', message: `Updated '${personExists.name}'` })
                    setTimeout(() => {
                        setNotificationMessage({})
                    }, 5000)
                })
        }
    }

    const handleOnChangeName = event => {
        setNewName(event.target.value)
    }

    const handleOnChangeNumber = event => {
        setNewNumber(event.target.value)
    }

    const handleOnChangeSeach = event => {
        setNewFilter(event.target.value)
    }

    const handleDeletePhone = id => {
        const person = persons.find(p => p.id === id)
        const confirm = window.confirm('Delete ' + person.name)
        if (confirm === true) {
            personService.deletePerson(id)
                .then(deletePerson => {
                    setPersons(persons.filter(p => p.id !== id))
                }).catch(error => {
                    setNotificationMessage({ className: 'error', message: `Person '${person.name}' was already removed from server` })
                    setTimeout(() => {
                        setNotificationMessage({})
                    }, 5000)
                })
        }
    }

    return (
        <div>
            <DisplayTitle text="Phonebook" />
            <Notification message={notificationMessage.message} notificationClass={notificationMessage.className} />
            <FilterForm handleOnChangeSeach={handleOnChangeSeach} newFilter={newFilter} />
            <Form handleOnSubmit={handleOnSubmit} handleOnChangeName={handleOnChangeName} handleOnChangeNumber={handleOnChangeNumber} newName={newName} newNumber={newNumber} />
            <Numbers persons={persons} filter={newFilter} handleDeletePhone={handleDeletePhone} />
        </div>
    )
}

export default App