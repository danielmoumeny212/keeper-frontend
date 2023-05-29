import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

import { getNotes, addNote, deleteNote } from "../services/noteServices";

import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data: notes } = await getNotes();
      setNotes((prevNotes) => [...notes]);
    };
    fetchNotes();
  }, [notes]);

  async function handleAddNote(newNote) {
    const originalNote = notes;
    const { title, content } = newNote;
    if (title === "" || content === "")
      return toast.error("the note should not be empty ");
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    try {
      await addNote(newNote);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(error.response);

        setNotes(originalNote);
      }
    }
  }

  async function handleDelete(id) {
    const originalNote = notes;
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
    try {
      await deleteNote(id);
      toast.success("the note was deleted successfully");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(error.response);
        setNotes(originalNote);
      }
    }
  }
  function modifiedNote(id, noteModified) {
    const [title, content] = noteModified;
    setNotes((prevNotes) => {
      return [
        ...prevNotes.map((co, index) =>
          index === id ? (co.title = title) : (co.content = content)
        ),
      ];
    });
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <CreateArea onAdd={handleAddNote} />

      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          createdAt={note.createdAt}
          onDelete={handleDelete}
          onModified={modifiedNote}
        />
      ))}

      <Footer />
    </>
  );
}

export default App;
