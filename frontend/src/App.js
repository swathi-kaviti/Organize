import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Todo from './components/Todo';  // The combined Todo component
import Notes from './components/Notes'; // Example, update as per your structure
import Calendar from './components/Calendar'; // Example, update as per your structure
import Home from './components/Home';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        {/* Define individual routes for daily, weekly, and monthly */}
        <Route path="/tododaily" element={<Todo category="daily" />} />
        <Route path="/todoweekly" element={<Todo category="weekly" />} />
        <Route path="/todomonthly" element={<Todo category="monthly" />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
