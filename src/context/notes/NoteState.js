import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "64def4775509a8b9c315e2c2",
          "user": "64de5c9fa5675d86ed2209a3",
          "title": "My title2",
          "description": "Please eat breakfast on time",
          "tag": "Mourning Routine",
          "__v": 0
        },
        {
          "_id": "64def4b35509a8b9c315e2c5",
          "user": "64de5c9fa5675d86ed2209a3",
          "title": "New Note",
          "description": "Study for atleast 5 hrs",
          "tag": "Routine",
          "__v": 0
        },
        {
            "_id": "64def4775509a3b9c315e2c2",
            "user": "64de5c9fa5675d86ed2209a3",
            "title": "My title2",
            "description": "Please eat breakfast on time",
            "tag": "Mourning Routine",
            "__v": 0
          },
          {
            "_id": "64def4b32509a8b9c315e2c5",
            "user": "64de5c9fa5675d86ed2209a3",
            "title": "New Note",
            "description": "Study for atleast 5 hrs",
            "tag": "Routine",
            "__v": 0
          },
          {
            "_id": "64def4775709a8b9c315e2c2",
            "user": "64de5c9fa5675d86ed2209a3",
            "title": "My title2",
            "description": "Please eat breakfast on time",
            "tag": "Mourning Routine",
            "__v": 0
          },
          {
            "_id": "64def4b35509a8b9c375e2c5",
            "user": "64de5c9fa5675d86ed2209a3",
            "title": "New Note",
            "description": "Study for atleast 5 hrs",
            "tag": "Routine",
            "__v": 0
          }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;