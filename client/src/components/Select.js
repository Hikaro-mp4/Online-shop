import React from 'react'

const Select = ({options,defaultValue}) => {
    return (
        <select>
            <option selected disabled value={defaultValue}>{defaultValue}</option>
            {options.map(value=>
                <option key={value} value={value}>{value}</option>
                )}
        </select>
    )
}

export default Select