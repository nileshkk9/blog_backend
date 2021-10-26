const express = require("express");
const auth = require("../util/auth");
const Blog = require("../model/blog");
const blogService = require("../service/blog");
const router = express.Router();


router.post("/blogs/push", auth, async (req, res, next) => {
    try {
        if (req.user.role !== "CONTENT-WRITER") {
            const error = new Error("Please Authenticate as CONTENT-WRITER")
            error.status = 401;
            throw error;
        }
        req.body.owner = req.user._id;
        const blog = new Blog(req.body);
        const insertedData = await blogService.push(blog);
        res.json(insertedData);
    } catch (error) {
        next(error);
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
        if (req.user.role !== "ADMIN") {
            const error = new Error("Please Authenticate as ADMIN")
            error.status = 401;
            throw error;
        }
        const data = await blogService.approve(req.body.blogid);
        res.json(data);
    } catch (error) {
        next(error)
    }
});

router.post("/blogs/delete", auth, async (req, res, next) => {
    try {
        if (req.user.role !== "ADMIN") {
            const error = new Error("Please Authenticate as ADMIN")
            error.status = 401;
            throw error;
        }
        const data = await blogService.delete(req.body.blogid);
        res.json(data);
    } catch (error) {
        next(error)
    }
});
module.exports = router;