const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const express = require("express");

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "no name entered"]
        },
        surname: {
            type: String,
            required: [true, "no surname entered"]
        },
        email:{
            type: String,
            required: [true, "NO EMAIL entered"]
        }
    },
    {
        timestamps: true
    }
)


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;