import React from 'react';

const Number = ({ person, handleDeletePhone }) =>
    <div>
        {person.name} {person.number}
        <button onClick={handleDeletePhone}>delete</button>
    </div>

export default Number