const express = require('express');
const {
    createItem,
    updateItem,
    deleteItem,
    updateState,
    getItems,
    getDateNotes,
    updateDateNotes
} = require('../controllers/controllers');
const router = express.Router();

// Fetch tasks by type using get
router.get('/tasks/:type',getItems);
//update the state put request
router.put("/update/:id",updateState);

// Create a new item (POST request)
router.post('/create', createItem);

// Update an existing item (PATCH request with type and ID)
router.patch('/update/:type/:id', updateItem);

// Delete an item (DELETE request with type and ID)
router.delete('/delete/:type/:id', deleteItem);

//fetching date notes
router.get("/dates", getDateNotes);

//update the date notes
router.put("/dates/update/:id", updateDateNotes);
module.exports = router;  