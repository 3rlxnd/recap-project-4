import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useState } from "react";
import { uid } from "uid";

function App() {
  console.log("Find Issue 1");
  const [ colors, setColors ] =useState(initialColors)

  function handleAdd(newColor) {
    
    setColors((prev) => [{
      id: uid(), 
      role: newColor.role,
      hex: newColor.hex, 
      contrastText: newColor.contrast 
    }, ...prev])
  }

  

  function handleDelete(id) {
    setColors(colors.filter((color) => color.id !== id))
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm handleAdd={handleAdd}/>
      {colors.length > 0 ? colors.map((color) => {
        return <Color key={color.id} id={color.id} color={color} onDelete={handleDelete}/>
      }) : <p>Nothing here yet! Please add a Color</p>}
    </>
  );
}

export default App;
