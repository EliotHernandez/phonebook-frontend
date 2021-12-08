import React from 'react';
import DisplayTitle from './DisplayTitle';
import Number from './Number';

const Numbers = ({ persons, filter, handleDeletePhone }) => {
    return (
        <>
            <DisplayTitle text="Numbers" />
            {persons.filter(person => {
                return person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
            }).map(person =>
                <Number key={person.id} person={person} handleDeletePhone={() => handleDeletePhone(person.id)} />
            )}
        </>
    )
}

export default Numbers