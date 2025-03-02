import React, { useState } from "react";
import "../App.css";

const Modal = ({ date, initialNote, onClose, onSave, onDelete }) => {
  const [note, setNote] = useState(initialNote);

  return (
    <div className="modal-overlay">
      <div className="modal-content"> {/* Updated from modal to modal-content */}
        <h3>Notes for {date}</h3>
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder="Write your notes here..."
        />
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={() => onSave(date, note)}>
            Save
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(date)}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
