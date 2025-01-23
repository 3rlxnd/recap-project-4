import React, { useEffect } from 'react'

export default function CopyButton({onCopy}) {
  return (
    <button onClick={onCopy}>Copy</button>
  )
}
