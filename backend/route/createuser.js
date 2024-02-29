const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const secretkey="waheisgood"
router.post("/createuser", [body('email').isEmail(),body('name').isLength({min:5}), body('password', 'incorrectpassword').isLength({ min: 5 })], async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let secpassword=await bcrypt.hash(req.body.password,10);
    try {
        User.create({
            name: req.body.name,
            password: secpassword,
            email: req.body.email,
            location: req.body.location

        }).then(res.json({ success: true }))
        
    }
    catch(error) {
        console.log(error);
        res.json({ success: false });

    }
})




router.post("/loginuser",[body('email').isEmail(), body('password', 'incorrectpassword').isLength({ min: 5 })],async (req,res) => {



    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        let email=req.body.email;
   
    try {
      let userdata=  await User.findOne({email});
        if(!userdata)
        {
            return res.status(400).json({ errors:"Try logging with correct credentials"});
        }
        let pwdcomapre=await bcrypt.compare(req.body.password,userdata.password);
        if(!pwdcomapre)
        {
            return res.status(400).json({ errors:"Try logging with correct credentials"});
        }
        let data={
            user:{
                id:userdata.id
            }

        }
        const authtoken=jwt.sign(data,secretkey);
        return res.json({success:true,authtoken:authtoken})
    }
    catch(error) {
        console.log(error);
        res.json({ success: false });

    }
})

module.exports = router;