const router = require('express').Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

router.route('/login').post((req, res) => {
    User.findOne({ username: req.body.username }).then(function (user) {
        if (user.username && user.password) {
            //console.log(user);
            if (user.username == req.body.username && user.password == req.body.password) {
                //alert('Login Test Passes!');

                let token = jwt.sign({ username: user.username },
                    process.env.SECRET,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                res.json({jwt:token,status:200,username:user.username});
            } else {
                res.send(403).json('Incorrect Username and Password');
            }

        } else {
            res.send(400).json('Authentication failed! Please check the request');
        }

    }).catch((err) => {
        res.json('Error ' + err);
    });
});

router.route('/register').post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;

    const newUser = new User({ username, password, fullName });

    newUser.save().then(() => {
        res.json({status:200,message:'User Added!'});
    }).catch((err) => {
        res.status(400).json('Error ' + err);
    });
});

router.route('/:username').get((req,res)=>{
    User.findOne({username:req.params.username}).then((user)=>{
        //console.log(user);
        res.json(user);
    }).catch((err)=>{res.status(400).json('Error '+err)});
});



module.exports = router;