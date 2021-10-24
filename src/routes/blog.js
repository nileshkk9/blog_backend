const express = require("express");
const auth = require("../util/auth");
const Blog = require("../model/blog");
const blogService = require("../service/blog");
const router = express.Router();


router.post("/blogs/push", auth, async (req, res) => {
    try {
        req.body.owner = req.user._id;
        const blog = new Blog(req.body);
        const insertedData = await blogService.push(blog);
        res.json(insertedData);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;