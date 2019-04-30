var mongoose=require("mongoose");
const express = require('express');
const jwt = require('jsonwebtoken');
const _app = require('./config.js');
mongoose.connect('mongodb+srv://tameem:91i2ta@cluster0-i1pux.mongodb.net/test?retryWrites=true');


var app=express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var users = mongoose.model('users',{username : String, password : String, age : String, College : String});

var exuser= {
  username : "tameem6",
  password : "wxyz"
};



app.get('/', (req,res) =>{
    res.send("Use /login");
});
app.get('/login', (req,res)=>{
    users.find({username: 'tameem6', password : 'wxyz'}, (err,user) => {
      if(err)
        return console.log(err);
      else if(!user)
        console.log('User not found');
    });
    let token = jwt.sign(user, 'secret');
    res.json({
        token
    });

});

app.post('/profile', verifyToken, (req,res) =>{
    res.json({
        success: true,
        message: "User info here",
        exuser
    })
});
app.listen(process.env.PORT || 8080);

function verifyToken(req,res,next){
    try{
        //Split header and extract token
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message : "Auth failed"
        });
    }
}
