const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// const validator = require("validator");

const BlogsSchema = Schema({
    title: {
        type: String,
        required: [true, "blog title is required"],
        trime: true
    },
    body: {
        type: String,
        required: [true, "blog title is required"],
        trime: true,
        minlength: 100,

    },
    published: {
        type: Boolean,
        default: false,

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},

    {
        timestamps: true
    }
);
const Blog = mongoose.model("Blogs", BlogsSchema);
module.exports = Blog;