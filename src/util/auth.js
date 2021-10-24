const jwt = require("jsonwebtoken");
const User = require("../model/user");
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log(token)
        const decoded = jwt.verify(token, "nilesh");
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
        });
        if (!user) {
            const error = new Error("please authenticate");
            error.status = 401;
            throw error;
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
module.exports = auth;