import React, { useState, useEffect } from "react";
import "../App.css";
import Modal from "./Modal"; // Import a modal component

const Timetable = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({}); // Store all notes

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Fetch all notes when the page loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/userRoutes/dates");
        const data = await response.json();
  
        if (response.ok) {
          const formattedNotes = {};
          data.notes.forEach(note => {
            formattedNotes[note.date] = { _id: note._id, info: note.info };
          });
          setNotes(formattedNotes); 
        } else {
          console.warn("Failed to fetch notes.");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  
    fetchNotes();
  }, []);
  
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const selectedDate = `${currentYear}-${currentMonth + 1}-${day}`;
    setSelectedDate(selectedDate);
  };

  const handleSaveNote = async (date, note) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [date]: { info: note },
    }));
  
    try {
      const existingNote = notes[date]; // Check if a note already exists
  
      if (existingNote && existingNote._id) {
        // If note exists, update it
        const response = await fetch(`http://localhost:5000/api/userRoutes/dates/update/${existingNote._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ info: note }),
        });
  
        if (response.ok) {
          setSelectedDate(null); // ✅ Close modal after saving
        } else {
          console.error("Error updating note:", response.statusText);
        }
      } else {
        // If note doesn't exist, create a new one
        const response = await fetch("http://localhost:5000/api/userRoutes/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "dates", date, info: note }),
        });
  
        if (response.ok) {
          const newNote = await response.json();
          setNotes((prevNotes) => ({
            ...prevNotes,
            [date]: { _id: newNote._id, info: note },
          }));
          setSelectedDate(null);
        } else {
          console.error("Error saving note:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Failed to save or update note:", error);
    }
  };
  
  
  

  const handleDeleteNote = async (date) => {
    if (!notes[date] || !notes[date]._id) {
      console.error("Error: No valid _id found for this date");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/userRoutes/delete/dates/${notes[date]._id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setNotes((prevNotes) => {
          const updatedNotes = { ...prevNotes };
          delete updatedNotes[date]; // ✅ Remove the note from state
          return updatedNotes;
        });
  
        setSelectedDate(null);
      } else {
        console.error("Error deleting note:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };
  
  
  return (
    <div>
      <div className="container" id="calnav">
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-secondary" onClick={handlePrevMonth}>
            &laquo; Previous
          </button>
          <h2>{`${months[currentMonth]} ${currentYear}`}</h2>
          <button className="btn btn-secondary" onClick={handleNextMonth}>
            Next &raquo;
          </button>
        </div>

        <table className="calendar">
          <thead>
            <tr>
              <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
              <th>Thu</th><th>Fri</th><th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 7 }).map((_, j) => {
                  let day = i * 7 + j - firstDay + 1;
                  if (day < 1 || day > daysInMonth) return <td key={j}></td>;

                  let dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
                  let isToday =
                    day === todayDate &&
                    currentMonth === todayMonth &&
                    currentYear === todayYear;

                  let hasNote = notes[dateKey]; // ✅ Check if a note exists

                  return (
                    <td key={j} className={`${isToday ? "today" : ""} ${hasNote ? "has-note" : ""}`}>
                      <button
                        className="date-btn"
                        onClick={() => handleDateClick(day)}
                      >
                        {day}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modal for Viewing & Adding Notes */}
      {selectedDate && (
        <Modal
        date={selectedDate}
        initialNote={notes[selectedDate]?.info || ""} // ✅ Fix: Extract only the "info" text
        onClose={() => setSelectedDate(null)}
        onSave={handleSaveNote}
        onDelete={() => {
          handleDeleteNote(selectedDate);
          setSelectedDate(null);
        }}
      />
      
      )}
    </div>
  );
};

export default Timetable;
