import "./Color.css";
import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyButton from "../CopyButton/CopyButton";


export default function Color({ color, onDelete, onEdit }) {
  const [deleteMessage, setDeleteMessage] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [check, setCheck] = useState('')
  const [name, setName] = useState('')

  const getContrastResult = async (foreground, background) => {
    try {
      const repsonse = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
        method: "POST",
        body: JSON.stringify({ colors: [foreground, background] })
      })
      if (!repsonse.ok) {
        throw Error('Failed to fetch')
      }
      const data = await repsonse.json()
      setCheck(data.overall)
    } catch (error) {
      console.error(error);
      
    }
  };

  const getNameResult = async (color) => {
    try {
      const repsonse = await fetch(`https://api.color.pizza/v1/?values=${color.replace("#", "")}`)
      const data = await repsonse.json()
      if (!repsonse.ok) {
        throw Error('Failed to fetch')
      }
      setName(await data.paletteTitle) 
    } catch (error) {
      console.log(error);    
    }
  };


// nearestColor need objects {name => hex} as input
// const colors = colornames.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});

// const nearest = nearestColor.from(colors);

// // get closest named color
// console.log(nearest('#f1c1d1'))

  useEffect(() => {
    getContrastResult(color.contrastText, color.hex)
    getNameResult(color.hex)
  }, [color])


  useEffect(() => {
    setInterval(() => {
      setCopied(false)
    }, 3000)
    clearInterval()
  }, [copied])

  async function handleCopy(color) {
    setCopied(true)
    await navigator.clipboard.writeText(color)
  }

  return (
    <div className="color-card" style={{ background: color.hex, color: color.contrastText, }}>
      <h3>{name}</h3>
      <p className="color-card-headline">{color.hex}</p>
      <CopyButton onCopy={() => handleCopy(color.hex)} />
      {copied && <p>Copied</p>}
      <h4>{color.role}</h4>
      <p>{color.contrastText}</p>
      <p>{color.result}</p>
      <p>Contrast Result: {check}</p>


      {editMode ?
        <>
          <ColorForm id={color.id} handleData={onEdit} text='Save' values={{ contrast: color.contrastText, hex: color.hex, role: color.role }} />
          <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</button>
        </> : <>
          {deleteMessage ? <>
            <p className="color-card-hightlight">Delete Color?</p>
            <button onClick={() => setDeleteMessage(false)}>Cancel</button>
            <button onClick={() => onDelete(color.id)}>Delete</button>
          </> : <>
            <button onClick={() => setDeleteMessage(true)}>Delete</button>
            <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</button>
          </>
          }
        </>
      }
    </div>
  );
}