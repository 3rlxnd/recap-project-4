import React, { useState } from 'react'
import ColorInput from '../ColorInput/ColorInput'

export default function ColorForm({handleData, text, values, id}) {
    const [role, setRole] = useState(values.role)
    
    function handleSubmit(event) {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const data = Object.fromEntries(formdata)
        handleData({...data, role: role}, id)
    }

    function handleChange(event) {
        setRole(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="role">Role</label>
            <input id='role' type="text" name='role' value={role} onChange={handleChange}/>
            <label htmlFor="hex">Hex</label>
            <ColorInput id='hex' name='hex' value={values.hex}/>
       
            <label htmlFor="contrast">Contrast</label>
            <ColorInput id='contrast' name='contrast' value={values.contrast}/>
            <button >{text} Color</button>
        </form>
    )
}
