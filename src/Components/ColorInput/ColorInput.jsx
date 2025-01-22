import React, { useState } from 'react'

export default function ColorInput({name, value}) {
    const [ color, setColor ] = useState(value)
    
    function handleChange(event) {
        setColor(event.target.value);
    }

    return (
        <div id='name-input' className='color-input-wrapper'>
            <input name={name} type="text" value={color} onChange={handleChange}/>
            <input type="color" value={color} onChange={handleChange}/>
        </div>
    )
}
