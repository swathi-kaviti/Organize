import React, { useState, useEffect } from "react";
import "../App.css";

const Todo = ({ category }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);


    // Function to fetch tasks
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/userRoutes/tasks/" + category);

        const data = await response.json();
        
        if (!response.ok) {
          console.error("Error fetching tasks:", data.error);
          return;
        }
  
        setTasks(data); // Update state with fetched tasks
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
  
    // Fetch tasks when the component mounts or category changes
    useEffect(() => {
      fetchTasks();
    }, [category]);


  // Add a task
  const addTask = async () => {
    if (task.trim()) {
      const newTask = {
        title: task,
        state: false,
        type: category, // Ensure type is included
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/userRoutes/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          console.error("Error adding task:", data.error);
          return;
        }
  
        // Update the tasks state immediately to reflect the new task on the UI
        setTasks((prevTasks) => [...prevTasks, data]);
  
        setTask("");
        setShowAddForm(false);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };
  
  
  


  // Remove a task
  // Remove a task
const removeTask = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/userRoutes/delete/${category}/${taskId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error deleting task:", data.error);
      return;
    }

    // Update the tasks state to remove the deleted task
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

  // Toggle task completion
  const toggleTaskCompletion = async (taskId, currentState) => {
    try {
      const response = await fetch(`http://localhost:5000/api/userRoutes/update/${category}/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: !currentState }), // Toggle state
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Error updating task:", data.error);
        return;
      }
  
      // Update the state in the frontend
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, state: !currentState } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  

  // Render tasks based on the selected category
  const renderTasks = () => {
    if (!tasks || tasks.length === 0) {
      return <p>No tasks found.</p>; // Fallback message
    }
  
    return tasks.map((taskObj, index) => (
      <li key={taskObj._id} className={`lists ${taskObj.state ? "completed" : ""}`}>
        {taskObj.title}
        <div>
          <input
            type="checkbox"
            className="form-check-input"
            style={{ marginTop: "10px" }}
            checked={taskObj.state}
            onChange={() => toggleTaskCompletion(taskObj._id, taskObj.state)}
          />
          <button
            id="remove"
            className="btn btn-danger"
            onClick={() => removeTask(taskObj._id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </li>
    ));
  };
  
  return (
    <div>
      <div className="container text-center mt-10" style={{ marginTop: "20px" }}>
        <h1 className="mt-3">
          <b>
            {category === "daily"
              ? "Today's Tasks"
              : category === "weekly"
              ? "Weekly Tasks"
              : "Monthly Tasks"}
          </b>
        </h1>
        <div id="form">
          <ul id="tasks">{renderTasks()}</ul>
        </div>

        {/* Task Input Form (Only Shows When Adding a New Task) */}
        {showAddForm && (
          <div id="addform" className="mt-3">
            <label htmlFor="task">
              <b>Enter the task:</b>
            </label>
            <input
              type="text"
              name="task"
              id="task"
              className="form-control my-2 centered-input"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{ width: "300px" }}
            />
            <button id="add" className="btn btn-success" onClick={addTask}>
              Add
            </button>
          </div>
        )}

        {/* "New" Button (Only Visible When Form is Hidden) */}
        {!showAddForm && (
          <button
            id="new"
            className="btn mt-3"
            onClick={() => setShowAddForm(true)}
          >
            <b> &#x2B; New</b>
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
