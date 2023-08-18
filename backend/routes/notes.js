const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the Notes using: GET "api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // Access all the notes of a particular user
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Create the note if no error 
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3: Update an existing Note using: PUT "/api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async(req, res) => {
    const { title, description, tag } = req.body;
    try {   
    // Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Check if the note exists
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // Check if the user has the access to the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    //Update the  note
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

// Route 4: Delete an existing Note using: DELETE "/api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    try {   
    // Check if the note exists
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // Check if the user has the access to the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    // Delete the note
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note: note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

module.exports = router