const router = require('express').Router();
const Note = require('../models/notes');

router.route('/').get((req,res)=>{
    Note.find().then((notes)=>{res.json(notes)}).catch((err)=>{res.status(400).json('Error '+err)});
});

router.route('/add').post((req,res)=>{
   
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;

    const newNote = new Note({title,description,date});

    newNote.save().then(()=>{
        res.json('Notes Added!');
    }).catch((err)=>{
        res.status(400).json('Error '+err);
    });
});

router.route('/:id').get((req,res)=>{
    Note.findById(req.params.id)
    .then(function(note){
        res.json(note);
    })
    .catch(function(err){
        res.status(400).json('Error '+err);
    });
});

router.route('/:id').delete((req,res)=>{
    Note.findByIdAndDelete(req.params.id)
    .then(function(){
        res.json('Note Deleted!');
    })
    .catch(function(err){
        res.status(400).json('Error '+err);
    });
});

router.route('/update/:id').post((req,res)=>{
    Note.findById(req.params.id)
    .then(function(note){
        note.title= req.body.title;
        note.description = req.body.description;
        note.date = Date.now();

        note.save()
        .then(function(){
            res.json('Note Updated!');
        })
        .catch(function(err){
            res.status(400).json('Error '+err);
        });
    })
    .catch(function(err){
        res.status(400).json('Error '+err);
    });
});

module.exports = router;