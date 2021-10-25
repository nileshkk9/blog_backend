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
blog.showAll = async () => {
    const allBlogs = await Blog.find({ published: false });
    if (!allBlogs) {
        const error = new Error("No Blogs Found");
        error.status = 400;
        throw error;
    }
    return allBlogs;


}

blog.showactiveposts = async () => {
    const allBlogs = await Blog.find({ published: true });
    if (!allBlogs) {
        const error = new Error("No Blogs Found");
        error.status = 400;
        throw error;
    }
    return allBlogs;


}

blog.approve = async (id) => {
    console.log(id);
    const updatedData = await Blog.updateOne({ _id: id }, { $set: { published: true } });
    if (!updatedData) {
        const error = new Error("No Blogs Found");
        error.status = 400;
        throw error;
    }
    return updatedData;


}

blog.delete = async (id) => {
    console.log(id);
    const deletedData = await Blog.deleteOne({ _id: id });
    if (!deletedData) {
        const error = new Error("No Blogs Found");
        error.status = 400;
        throw error;
    }
    return deletedData;
}
module.exports = blog;
