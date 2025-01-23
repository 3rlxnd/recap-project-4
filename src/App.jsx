import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useState } from "react";
import { uid } from "uid";

// localStorage.clear();

function App() {
  console.log("Find Issue 1");
  const [colors, setColors] = useState(JSON.parse(localStorage.getItem('colors')) || initialColors)

  function handleAdd(newColor, id) {
    const newColors = [{
      id: uid(),
      role: newColor.role,
      hex: newColor.hex,
      contrastText: newColor.contrast
    }, ...colors]
    setColors(newColors)
    localStorage.setItem('colors', [JSON.stringify(newColors)])
  }

  function handleEdit(newColor, id) {
    const newColors = colors.map((color) => color.id === id ? {
      ...color,
      role: newColor.role,
      hex: newColor.hex,
      contrastText: newColor.contrast,
    } : color)
    setColors(newColors)
    localStorage.setItem('colors', [JSON.stringify(newColors)])
  }

  function handleDelete(id) {
    const newColors = colors.filter((color) => color.id !== id)
    setColors(newColors)
    localStorage.setItem('colors', [JSON.stringify(newColors)])
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm handleData={handleAdd} text='Add' values={{ contrast: '#ffffff', hex: '#000000', role: 'Primary Color' }} />
      {colors.length > 0 ? colors.map((color) => {
        return <Color key={color.id} color={color} onDelete={handleDelete} onEdit={handleEdit} />
      }) : <p>Nothing here yet! Please add a Color</p>}
    </>
  );
}

export default App;
