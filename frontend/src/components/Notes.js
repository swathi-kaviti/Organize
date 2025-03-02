import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState(null); // Stores the note being edited
  const [showEditModal, setShowEditModal] = useState(false); // Controls modal visibility
  const [showAddModal, setShowAddModal] = useState(false); // Controls add note modal

  // Fetch notes
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/userRoutes/tasks/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Save new note
  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) return;

    axios
      .post("http://localhost:5000/api/userRoutes/create", {
        type: "notes",
        title: newNote.title,
        content: newNote.content,
      })
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNote({ title: "", content: "" });
        setShowAddModal(false);
      })
      .catch((error) => console.error("Error adding note:", error));
  };

  // Delete note
  const handleDeleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/api/userRoutes/delete/notes/${id}`)
      .then(() => setNotes(notes.filter((note) => note._id !== id)))
      .catch((error) => console.error("Error deleting note:", error));
  };

  // Open Edit Modal
  const handleEditClick = (note) => {
    setEditNote(note);
    setShowEditModal(true);
  };

  // Update note
  const handleUpdateNote = () => {
    if (!editNote.title || !editNote.content) return;
  
    axios
      .patch(`http://localhost:5000/api/userRoutes/update/notes/${editNote._id}`, {
        type: "notes",
        title: editNote.title,
        content: editNote.content,
      })
      .then((response) => {
        const updatedNote = { ...editNote, ...response.data }; // Ensure _id is present
        setNotes(notes.map((note) => (note._id === editNote._id ? updatedNote : note)));
        setShowEditModal(false);
      })
      .catch((error) => console.error("Error updating note:", error));
  };
  

  return (
    <div className="notes-container">
      <div className="text-center">
        <button className="btn btn-secondary add-note-btn" onClick={() => setShowAddModal(true)}>
          + New Note
        </button>
      </div>

      {/* Custom Add Note Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <h2>New Note</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <textarea
              className="form-control"
              rows="4"
              placeholder="Your notes here..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={handleSaveNote}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Display Notes (Only Showing Title) */}
      <div className="saved-notes">
      {notes.map((note) => (
        <div key={note._id || Math.random()} className="note-item">
          <h5>{note.title}</h5>
          <button className="btn btn-warning" onClick={() => handleEditClick(note)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeleteNote(note._id)}>Delete</button>
        </div>
      ))}

        </div>

      {/* Custom Edit Modal */}
      {showEditModal && editNote && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <h2>Edit Note</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={editNote.title}
              onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
            />
            <textarea
              className="form-control"
              rows="4"
              placeholder="Your notes here..."
              value={editNote.content}
              onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={handleUpdateNote}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
