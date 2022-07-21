const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User")
const {protect} = require("../../middlewares/auth")
const jwt = require('jsonwebtoken')

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
                    res.json({
                    message: "login success",
                    _id: user.id,
                    name: user.username,
                    email:user.email,
                    token : generateToken(user._id)
                });
            }
            else{
                res.status(400)
                throw new Error('Invalid credentials')
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
});

//User registration
router.post( "/register",
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

            let userExist = await User.findOne({
                email
            });
            if (userExist) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                
            });

            if(user){
                res.status(201).json({
                    _id:user.id,
                    name:user.username,
                    email: user.email,
                    token : generateToken(user._id)
                })
            }
        else{
            console.log(err.message);
            res.status(500).send("Error in Saving");          
        }
});

//Testing
router.get("/me", protect, async (req, res) => {
    res.json({ message: "logged in" });
    console.log(req.user.id);
});

//User logout
router.get('/logout', protect, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.json({ message: "logged out" });
    });
});


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = router;