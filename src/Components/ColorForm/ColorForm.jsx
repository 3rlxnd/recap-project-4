import React, { useState } from 'react'
import ColorInput from '../ColorInput/ColorInput'

export default function ColorForm({handleAdd}) {
    
    function handleSubmit(event) {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const data = Object.fromEntries(formdata)
        handleAdd(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            Role
            <input id='role' type="text" name='role'/>
            <br />
            Hex
            <ColorInput name='hex' value={'#ffffff'}/>
            <br />
            Contrast Text
            <ColorInput name='contrast' value={'#000000'}/>
            <button >Add Color</button>
        </form>
    )
}
