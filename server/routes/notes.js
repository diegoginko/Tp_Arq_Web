const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const verify = require('./verifyToken');

//Get ALL
router.get('/', verify, async (req, res) => {
    try{
        const notes = await Note.find({user: req.user._id});
        res.status(200).json(notes);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Get by Id
router.get('/:noteId', verify, async (req, res) => {
    try{
        const note = await Note.findById(req.params.noteId);
        res.status(200).json(note);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Creo una nota
router.post('/', verify, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id
    });
    try{
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Edito una nota
router.patch('/:noteId', verify, async (req, res) => {
    try{
        const updatedNote = await Note.updateOne(
            {_id: req.params.noteId, user: req.user._id},
            { $set: { title: req.body.title, description: req.body.description}
        });
        res.status(200).json(updatedNote);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Borro nota por id
router.delete('/:noteId', verify, async (req, res) => {
    try{
        const removedNote = await Note.remove({_id: req.params.noteId, user: req.user._id});
        res.status(200).json(removedNote);
    } catch (err){
        res.status(500).json({ message: err});
    }
});


module.exports = router;