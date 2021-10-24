const express = require("express");
const Blog = require("../model/blog");

const blog = {};
blog.push = async (blogData) => {
    try {
        const insertedData = await Blog.create(blogData);
        return insertedData;
    } catch (error) {
        console.log(error);
    }
}
blog.showAll = async (blogData) => {
    const allBlogs = await Blog.find();
    if (!allBlogs) {
        const error = new Error("No Blogs Found");
        error.status = 400;
        throw error;
    }
    return allBlogs;


}
module.exports = blog;
