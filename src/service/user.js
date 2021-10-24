const express = require("express");
const auth = require("../util/auth");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const user = {};
user.adduser = async (userObj) => {
    let insertData = await User.create(userObj);
    const uData = await generateAuthToken(insertData);
    return uData;
};
user.login = async (userObj) => {
    const user = await User.findOne(userObj);
    if (!user) {
        const error = new Error("Unable to login");
        error.status = 401;
        throw error;
    }
    const token = await generateAuthToken(user);
    return { user, token };



};

user.logout = async (req) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();
    }
    catch (e) {
        console.log(e);
    }

};

generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, "nilesh");
    let uData = await User.updateOne(
        { email: user.email },
        { $push: { tokens: { token: token } } }
    );
    return token;
};
module.exports = user;
