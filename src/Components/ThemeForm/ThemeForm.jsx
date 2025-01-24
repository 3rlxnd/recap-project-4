import React from 'react'

export default function ThemeForm({ themes, onChange }) {
    function handleChange(event) {
        onChange(event.target.value)
    }

    return (
        <select onChange={handleChange}>
            {themes.map(theme => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
        </select>
    )
}
