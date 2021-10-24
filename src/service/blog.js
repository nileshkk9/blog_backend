const express = require("express");
const Blog = require("../model/blog");

const blog = {};
blog.push = async (blogData) => {
    try {
        console.log(blogData);

        const insertedData = await Blog.create(blogData);
    } catch (error) {
        console.log(error);
    }
}
module.exports = blog;
