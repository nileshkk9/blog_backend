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
// for admin
router.get("/blogs/showall", auth, async (req, res, next) => {
    try {
        const data = await blogService.showAll();
        res.json(data);
    } catch (error) {
        next(error)
    }
});

router.get("/blogs/showactiveposts", async (req, res, next) => {
    try {
        const data = await blogService.showactiveposts();
        res.json(data);
    } catch (error) {
        next(error)
    }
});


router.post("/blogs/approve", auth, async (req, res, next) => {
    try {
        const data = await blogService.approve(req.body.blogid);
        res.json(data);
    } catch (error) {
        next(error)
    }
});
module.exports = router;