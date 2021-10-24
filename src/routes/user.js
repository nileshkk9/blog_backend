const express = require("express");
const auth = require("../util/auth");
const User = require("../model/user");
const userService = require("../service/user");
const router = express.Router();
router.post("/users/login", async (req, res, next) => {
    try {
        const logindata = await userService.login(req.body);
        if (logindata)
            res.send(logindata);
    } catch (err) {
        next(err)
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        const logoutData = await userService.logout(req);
        res.json({ mesage: "Logout Successful" });
    } catch (error) {
        next(err)
    }
});

router.post("/users/createuser", async (req, res) => {
    const userObj = new User(req.body);

    try {
        let addedUserData = await userService.adduser(userObj);
        if (addedUserData)
            res.status(201).json({ message: "Registered Successfully" });

    } catch (e) {
        next(err)
    }


});
module.exports = router;