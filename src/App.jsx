import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useState } from "react";
import { uid } from "uid";

function App() {
  console.log("Find Issue 1");
  const [colors, setColors] = useState(initialColors)

  function handleAdd(newColor, id) {
    setColors((prev) => [{
      id: uid(),
      role: newColor.role,
      hex: newColor.hex,
      contrastText: newColor.contrast
    }, ...prev])
  }

  function handleEdit(newColor, id) {
    setColors((prev) =>
      prev.map((color) => color.id === id ? {
            ...color,
            role: newColor.role,
            hex: newColor.hex,
            contrastText: newColor.contrast,
          } : color
      )
    );
  }

  function handleDelete(id) {
    setColors(colors.filter((color) => color.id !== id))
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
