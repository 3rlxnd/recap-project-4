import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeForm from "./Components/ThemeForm/ThemeForm";
import "./App.css";
import { useEffect, useState } from "react";
import { uid } from "uid";

// localStorage.clear();

function App() {
  console.log("Find Issue 1");

  const [colors, setColors] = useState(JSON.parse(localStorage.getItem('colors')) || initialColors) // JSON.parse(localStorage.getItem('colors')) || 
  const [themes, setThemes] = useState(initialThemes)
  const [selectedTheme, setSelectedTheme] = useState(themes[0]) //{ ...themes[0], colors: themes[0].colors.map(colorItem => colors.find(color => color.id === colorItem)) }

// console.log(localStorage.getItem('theme'));


  function changeTheme(id) {
    let theme = themes.find(theme => theme.id === id)
    setSelectedTheme(theme)
    localStorage.setItem('theme', [JSON.stringify(theme)])
  }

  // function saveTheme() {
  //   themes.forEach(theme => {
  //     if (theme.id === selectedTheme.id) {
  //       settheme.colors = selectedTheme.colors; // Replace the array
  //     }
  //   })
  // }

  function handleAdd(newColor, id) {
    let color = {
      id: uid(),
      role: newColor.role,
      hex: newColor.hex,
      contrastText: newColor.contrast
    }
    
    setColors([color, ...colors])
    setSelectedTheme({...selectedTheme, colors: [...selectedTheme.colors, color.id]});
    // saveTheme()
    
    localStorage.setItem('colors', [JSON.stringify([color, ...colors])]) 
    localStorage.setItem('theme', [JSON.stringify(selectedTheme)])
    
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
      <ThemeForm themes={themes} onChange={changeTheme} />
      <ColorForm
        handleData={handleAdd}
        text='Add'
        values={{ contrast: '#ffffff', hex: '#000000', role: 'Primary Color' }} />

      {selectedTheme.colors.length > 0 ? selectedTheme.colors.map((id) => {
      let colorObject = colors.find(color => color.id === id)
      // { ...themes[0], colors: themes[0].colors.map(colorItem => colors.find(color => color.id === colorItem)) }
        return <Color
          key={colorObject.id}
          color={colorObject}
          onDelete={handleDelete}
          onEdit={handleEdit} />}
      ) : <p>Nothing here yet! Please add a Color</p>
      }
    </>
  );
}

export default App;
