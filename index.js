// import express, mongoose, bodyparser and cors
const express = require('express');
const app = new express(); // create instance of express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json(); // use json as body parser
const cors = require('cors');
app.use(cors());

// create mongoose connection
mongoose.connect("mongodb+srv://lnmllrfrnndz:@10Blink_@cluster0-dwchw.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

// create User model with name and age as field
const User = mongoose.model('user',{
    name: String,
    age: Number
});

// set directory to static
app.use(express.static(__dirname+'/dist/app'));

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/dist/app/index.html');
});

app.get('/user', (req, res)  => {     
    User.find({}, (err, data) => {         
        if (err)res.json({"msg":"Invalid Request"});         
        res.json(data);     
    }); 
}); 

app.post('/user', urlEncoded, (req, res) => {     
    var user = new User({  
        name: req.body.name,            
        age: req.body.age   
    });     
    user.save((err) => { 
        if(err) res.json({msg:'Invalid Request!'});         
        res.json({msg:'Record saved!'})     
    }); 
}); 

app.put('/user/:id', urlEncoded, (req, res) => {
    User.updateOne({_id:req.params.id},{
        name: req.body.name,
        age: req.body.age
        }, (err, data) => {
    if(err) res.json({msg:'Invalid request'});
        res.json(data);
    });
});

app.delete('/user/:id', (req, res) => {
    User.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    })
});

// listen to port 80
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log('Server running at port ${PORT}');
});