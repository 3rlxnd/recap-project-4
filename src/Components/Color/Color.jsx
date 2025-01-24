import "./Color.css";
import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyButton from "../CopyButton/CopyButton";

export default function Color({ color, onDelete, onEdit }) {
  const [deleteMessage, setDeleteMessage] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [check, setCheck] = useState('')

  const getResult = async (foreground, background) => {
    const repsonse = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
      method: "POST",
      body: JSON.stringify({ colors: [foreground, background] })
    })
    const data = await repsonse.json()
    console.log(await data);
    
    setCheck(data.overall)
  };

  useEffect(() => {
    getResult(color.contrastText, color.hex)
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
      <h3 className="color-card-headline">{color.hex}</h3>
      <CopyButton onCopy={() => handleCopy(color.hex)} />
      {copied && <p>Copied</p>}
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <p>{color.result}</p>
      <p>{check}</p>


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