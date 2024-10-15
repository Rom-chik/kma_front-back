const express = require('express');
const mongoose = require('mongoose');
const server= express();
const userModel = require('./schemaModel');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


PORT = 5000;
server.use(express.json());

//mongodb connection
mongoose.connect("mongodb://localhost:27017/spamer")
    .then(() => {
        console.log('connected to MongoDB')
    }).catch((error) => {
    console.log(error)
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


server.use(bodyParser.json());
server.use(express.static(__dirname));
server.use('/',express.static('client'));


server.get('/', function(req, res){
    res.redirect(`http://localhost:${PORT}/lobby.html`);
});


//get data from database
server.get('/getUsers', async(req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users)
        //console.log(`users log: ${users}`) //console log our database objects
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
});


//send data to database
server.post('/addUser', async(req, res) => {
    try {
        //console.log(req.body)
        const users = await userModel.create(req.body.data)
        res.status(200).json(users);
        console.log(users);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});


//edit user data
server.put('/editUser/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        console.log(req.params.id);
        const users = await userModel.findOneAndReplace({_id: userId}, req.body.data, {new: true});
        res.json({users}); //res.status(200) треба ??
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});


//delete user
server.delete('/deleteUser/:id', async(req, res) => {
    try {
        const userID = req.params.id;
        await userModel.deleteOne({_id: userID});
        /* res.json({deletedCount: result.deletedCount});*/
        res.json("successfully deleted");
    } catch(error) {
        res.status(500).json({error: "DelEtE ErroR"});
    }
});


//send mail
server.post('/sendMail', async(req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "",//testEmailAccount.user,
            pass: ""//testEmailAccount.pass
        }
    });
    //message data
    let result = req.body.data;

    transporter.sendMail(result).then((info) => {
        return res.status(201).json({message: "you must have received an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({error})
    })

    });