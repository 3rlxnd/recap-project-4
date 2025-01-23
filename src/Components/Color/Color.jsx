import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onEdit }) {
  const [deleteMessage, setDeleteMessage] = useState(false)
  const [editMode, setEditMode] = useState(false)
  console.log(color.id);


  return (
    <div className="color-card" style={{ background: color.hex, color: color.contrastText, }}>
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>


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
