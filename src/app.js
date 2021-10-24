const express = require("express");
require("./db/mongoose");

const app = express();
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const errorlogger = require("./util/errorlogger");
const cors = require("cors");
const port = process.env.PORT || 2222;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(blogRouter);
app.use(errorlogger);

app.listen(port, () => {
    console.log("server running on port: " + port);
});