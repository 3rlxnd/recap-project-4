import "./Color.css";
import { useState } from "react";

export default function Color({id, color, onDelete }) {
  const [ deleteMessage, setDeleteMessage ] =useState(false)
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {deleteMessage ? <>
        <p className="color-card-hightlight">Delete Color?</p>
        <button onClick={() => setDeleteMessage(false)}>Cancel</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </> : <button onClick={() => setDeleteMessage(true)}>Delete</button>
      }
    </div>
  );
}
