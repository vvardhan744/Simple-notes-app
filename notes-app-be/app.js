const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const jwtmiddleware = require('./middlewares/jwtmiddleware');

const app = express();//initializing express app

app.use(express.json());//body-parser


//Middlewares
app.use(cors({origin:'*'}));


//simple routing
app.get('/',(req,res)=>{
    res.send({message:'Welcome to Notes App'});
});


//Routing
const notesRouting = require('./router/notes.router');
const usersRouting = require('./router/users.router');
app.use('/notes',notesRouting);
app.use('/users',usersRouting);



//Database Configuration
mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) throw err;
    console.log('Successfully Connected to MongoDb Atlas');
});



const port = process.env.PORT || 8040;

app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
});