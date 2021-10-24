const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const Task = require("./task");
// const jwt = require("jsonwebtoken");

// mongoose.Promise = global.Promise;
// mongoose.set("useCreateIndex", true);
// const url = "mongodb://localhost:27017/BloggingDB";
const UsersSchema = Schema({
    name: {
        type: String,
        required: [true, "User's name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email name is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email address");
            }
        }
    },
    role: {
        type: String,
        default: "CONTENT-WRITER"
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age cannot be negative");
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase() == "password") {
                throw new Error("Password cannot be PASSWORD");
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
},

    {
        timestamps: true
    }
);
const User = mongoose.model("Users", UsersSchema);
module.exports = User;