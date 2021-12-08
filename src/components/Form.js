import React from 'react';

const Form = props => {
    return (
        <form onSubmit={props.handleOnSubmit} >
            <div>
                name: <input onChange={props.handleOnChangeName} value={props.newName} />
            </div>
            <div>
                number: <input onChange={props.handleOnChangeNumber} value={props.newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form