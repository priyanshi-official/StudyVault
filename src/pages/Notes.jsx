import React from 'react'
import { FaSearch , FaPlus , FaStar , FaEdit , FaTrash} from "react-icons/fa"
import './Notes.css'
import { useState } from 'react'
import {useEffect} from "react";

const Notes = () => {
  const [showCard, setShowCard] = useState(false)   //model open/close

  const [title, setTitle] = useState("")  //Title input
  const [subject, setSubject] = useState("")    //Subject input
  const [description, setDescription] = useState("")   //descrption input

  const [notes, setNotes] = useState([]);   //Saare notes array mai store
  const [editIndex,setEditIndex]=useState(null);  // Kaunsa note edit karna hai id ke basis pe
  const [search,setSearch]=useState("");  // Search text

  const [selectedSubject, setSelectedSubject] = useState("All");  // Subject filter
  const [showImportant, setShowImportant] = useState(false);   //Important filter


  function displayModal() {
    if (showCard === false) {
        return null;
    }

    return (
        <div className="modal-layout">
            <div className="modal">
                <h2>Add New Note</h2>
                <label>Title</label>
                <input type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)}/>

                <label>Subject</label>
                <input type="text" value={subject}
                    onChange={(e) => setSubject(e.target.value)}/>

                <label>Description</label>
                <textarea rows="5" value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={() => setShowCard(false)}>Cancel</button>

                    <button className="save-btn" onClick={saveNote}>
                        {editIndex !== null ? "Update Note" : "Save Note"}</button>
                </div>
            </div>
        </div>
    );
}

// Saving the notes:add note or update note
  function saveNote(){
    if(title==="" || subject==="" || description===""){
        alert("Enter all details");
        return;
    }

    if (editIndex !== null) {
    const updated = notes.map(note =>
        note.id === editIndex ? {...note,
                title,
                subject,
                description
            }: note );

    setNotes(updated);
    setEditIndex(null);
    }

    else{
        const newNote={
            id: Date.now(),
            title,
            subject,
            description,
            important: false
        };
        setNotes([...notes,newNote]);
        window.dispatchEvent(new Event("notesUpdated"));
    }

    setTitle("");
    setSubject("");
    setDescription("");
    setShowCard(false);
}

//Marking as improtant , toggle the note
 function toggleImportant(id) {
    const updatedNotes = notes.map(note => note.id === id ? { ...note, important: !note.important } : note);
    setNotes(updatedNotes);
}


//Delete note
  function deleteNote(id) {
    if(!window.confirm("Delete this note?")) 
        return;
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
}


//load notes
    useEffect(()=>{
    const savedNotes=JSON.parse(localStorage.getItem("notes"));
    if(savedNotes){
    setNotes(savedNotes);
    }
    },[]);
//Save Notes
    useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
    },[notes]);


//Edit notes
function editNote(id) {
    const note = notes.find(note => note.id === id);
    if (!note) 
      return;

    setTitle(note.title);
    setSubject(note.subject);
    setDescription(note.description);
    setEditIndex(id);
    setShowCard(true);
}


// for making the subject option and important 
const subjects = [...new Set(notes.map(note => note.subject))];
const hasImportant = notes.some(note => note.important);


//main return 
  return (
    <div className="notes-container">

      <div className="notes-header">
        <div className="header-left">
            <h1>My Notes</h1>
            <p>Organize your study notes in one place.</p>
        </div>

        <div className="header-right">
          <div className="searchbar">
            <FaSearch className="search" />
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by title or subject..." />
          </div>

          <button className="add-btn" onClick={()=>{setShowCard(true)}}>
            <FaPlus /> Add Note</button>
        </div>
      </div>


      <div className="notes-mid">
        <button  className={ selectedSubject === "All" && !showImportant ? "active-filter" : ""}
            onClick={() => {
                setSelectedSubject("All");
                setShowImportant(false);
            }}>All
        </button>

        {subjects.map((subject, index) => (
            <button
                key={subject}
                className={ selectedSubject === subject && !showImportant ? "active-filter" : ""  }
               onClick={() => {
                      setSelectedSubject(subject);
                      setShowImportant(false);
                  }}>{subject}
            </button>
        ))}

        {hasImportant && (
            <button onClick={() => setShowImportant(true)}  className={showImportant ? "active-filter" : ""}>
                ⭐ Important
            </button>
        )}
      </div>


      <div className="notes-bottom">
        {notes.filter(note =>
                  note.title.toLowerCase().includes(search.toLowerCase()) ||
                  note.subject.toLowerCase().includes(search.toLowerCase())
              )
              .filter(note =>
                  selectedSubject === "All" ||
                  note.subject === selectedSubject
              )
              .filter(note =>
                  !showImportant || note.important
              )
              .map((note)=>{
          return (
            <div className="card" key={note.id}>
                <div className="card-top">
                    <div className="card-content">
                    <h3>{note.title}</h3>
                    <h5>Subject: {note.subject}</h5>
                    <p>{note.description}</p>
                    </div>

                    <div className="card-icons">
                    <FaStar
                        className={note.important ? "important" : ""}
                        onClick={() => toggleImportant(note.id)}/>

                    <FaEdit onClick={() => editNote(note.id)} />

                    <FaTrash onClick={() => deleteNote(note.id)} />
                    </div>
                </div>
        </div>
          )
        })}

      </div>

      {displayModal()}
    </div>
  )
}

export default Notes