const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User")
const auth = require("../../middlewares/auth")

//user login 
router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });
            if (user && isMatch) {
                req.session.loggedIn = true
                req.session.name = user.username
                req.session.user_id = user.id
                console.log(req.session);
                return res.status(200).json({
                    message: "login success",
                    user: req.session
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
});

//User registration
router.post( "/register",[
    check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.status(200).send("Registered")
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
});

//Testing
router.get("/me", auth, async (req, res) => {
    res.json({ message: "logged in" });
    console.log(req.session);
});

//User logout
router.get('/logout', auth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.json({ message: "logged out" });
    });
});

module.exports = router;