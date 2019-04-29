const express = require('express');
const jwt = require('jsonwebtoken');

var app=express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var user = {
    id: 1,
    name : "tameem"
};
app.get('/', (req,res) =>{
    res.send("Use /login");
}
app.get('/login', (req,res)=>{
    let token = jwt.sign({user}, 'secret');
    res.json({
        token
    });

});

app.post('/profile', verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secret', (err,authData) => {
        if(err){
            res.sendStatus(403);
        }
        else {
            res.json({
                message : 'User info here',
                authData
            });
        }

    });
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