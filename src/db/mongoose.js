const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/BloggingDB";
// process.env.MONGODB_URL
mongoose.connect(url);