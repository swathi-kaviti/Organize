const { DailyTask, WeeklyTask, MonthlyTask, Notes, Dates } = require('../models/models'); // Importing models

const mongoose = require('mongoose')

//creating items
const createItem = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging line

    const { type, ...data } = req.body;

    if (!type) {
      return res.status(400).json({ error: "Type is required" });
    }

    const models = {
      daily: { model: DailyTask, requiredFields: ["title", "state"] },
      weekly: { model: WeeklyTask, requiredFields: ["title", "state"] },
      monthly: { model: MonthlyTask, requiredFields: ["title", "state"] },
      notes: { model: Notes, requiredFields: ["title", "content"] },
      dates: { model: Dates, requiredFields: ["date", "info"] },
    };

    if (!models[type]) {
      return res.status(400).json({ error: "Invalid type provided" });
    }

    const { model: Model, requiredFields } = models[type];

    const missingFields = requiredFields.filter((field) => !(field in data));
    if (missingFields.length > 0) {
      return res.status(400).json({ error: "Please fill in all required fields", missingFields });
    }

    const item = await Model.create(data);
    res.status(201).json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//deleting items
const deleteItem = async (req, res) => {
    const { type, id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
  
    let Model;
  
    // Determine the collection dynamically
    switch (type) {
      case 'daily':
        Model = DailyTask;
        break;
      case 'weekly':
        Model = WeeklyTask;
        break;
      case 'monthly':
        Model = MonthlyTask;
        break;
      case 'notes':
        Model = Notes;
        break;
      case 'dates':
        Model = Dates;
        break;
      default:
        return res.status(400).json({ error: 'Invalid type provided' });
    }
  
    try {
      const item = await Model.findOneAndDelete({ _id: id });
  
      if (!item) {
        return res.status(404).json({ error: 'No such item' });
      }
  
      res.status(200).json({ message: 'Item deleted successfully', item });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



//update items
const updateItem = async (req, res) => {
  const { type, id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  let Model;
  switch (type) {
    case 'daily': Model = DailyTask; break;
    case 'weekly': Model = WeeklyTask; break;
    case 'monthly': Model = MonthlyTask; break;
    case 'notes': Model = Notes; break;
    default:
      return res.status(400).json({ error: 'Invalid type provided' });
  }

  try {
    const updatedItem = await Model.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: 'No such item' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//update state
const updateState = async(req, res) => {
    try {
      const { state } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { state },
        { new: true } // Return updated document
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: "Error updating task" });
    }
};


//get items
const getItems = async(req,res) => {
  const { type } = req.params;

  let Model;
  switch (type) {
    case 'daily':
      Model = DailyTask;
      break;
    case 'weekly':
      Model = WeeklyTask;
      break;
    case 'monthly':
      Model = MonthlyTask;
      break;
    case 'notes': // Add this case
      Model = Notes;
      break;
    case 'dates': // ✅ Added support for "dates"
      Model = Dates;
      break;
    default:
      return res.status(400).json({ error: 'Invalid type provided' });
  }

  try {
    const tasks = await Model.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDateNotes = async (req, res) => {
  try {
    const notes = await Dates.find(); // Fetch all date-based notes
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDateNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { info } = req.body;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    const existingNote = await Dates.findById(noteId);
    if (!existingNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    const updatedNote = await Dates.findByIdAndUpdate(
      noteId,
      { info },
      { new: true }
    );

    res.json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { 
        createItem,
        updateItem,
        deleteItem, 
        updateState,
        getItems,
        getDateNotes,
        updateDateNotes
        }; 