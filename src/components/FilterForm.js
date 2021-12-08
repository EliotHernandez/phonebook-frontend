import React from 'react';

const FilterForm = ({ handleOnChangeSeach, newFilter }) => {
    return (
        <form>
            filter shown with: <input onChange={handleOnChangeSeach} value={newFilter} />
        </form>
    )
}

export default FilterForm