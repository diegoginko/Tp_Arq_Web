const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

//Get ALL
router.get('/', async (req, res) => {
    try{
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Get by Id
router.get('/:noteId', async (req, res) => {
    try{
        const note = await Note.findById(req.params.noteId);
        res.status(200).json(note);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Creo una nota
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Edito una nota
router.patch('/:noteId', async (req, res) => {
    try{
        const updatedNote = await Note.updateOne(
            {_id: req.params.noteId},
            { $set: { title: req.body.title, description: req.body.description}
        });
        res.status(200).json(updatedNote);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

//Borro nota por id
router.delete('/:noteId', async (req, res) => {
    try{
        const removedNote = await Note.remove({_id: req.params.noteId});
        res.status(200).json(removedNote);
    } catch (err){
        res.status(500).json({ message: err});
    }
});

/* router.get('/', (req, res) => {
    res.send('Hola desde notas!')
}); */

/* router.post('/', (req, res) => {
    //console.log(req.body);
    const note = new Note({
        title: req.body.title,
        description: req.body.description
    });

    note.save()
    .then(data => {
        res.status(200).json(data);
    }) //Devuelve lo que se grabo
    .catch(err => {
        res.status(404).json({ message: err});
    }); //Si hubo erro, devuelvo el error
}); */

module.exports = router;