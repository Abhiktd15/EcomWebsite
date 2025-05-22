const { User } = require('../model/User.model.js');
const crypto = require('crypto');
const { sanitizeUser } = require('../services/common.services.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

exports.createUser = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(401).json({
                message:"Some Fields are missing",
                success:false
            })
        }

        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400).json({
                message:"User with email already exists",
                success:false
            })
        }
        
        const hashPassword = await bcrypt.hash(password,10)

        const user = new User({
            email,
            password:hashPassword
        })
        const doc = await user.save()
        const token = await jwt.sign({ id: doc.id },process.env.JWT_SECRET_KEY)
        
       return res.cookie('jwt', token, {maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:"strict"})
                .status(201)
                .json({id:doc.id, role:doc.role,message:"User Registered Successfully"});
    } catch (err) {
        console.log(err)
    }
    };

exports.loginUser = async (req, res) => {
    const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Some Fields are missing",
                success:false
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Invalid Credentials",
                success:false
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(400).json({
                message:"Incorrect Email or password",
                success:false
            })
        }
        const token = await jwt.sign({ id: user.id },process.env.JWT_SECRET_KEY)
        return res
            .cookie('jwt', token, {maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:"strict"})
            .status(200)
            .json({id:user.id,role:user.role,message:`Welcome Back ${user.email}`,success:true});
    };

exports.checkAuth = async (req, res) => {
    if(req.user){
        res.json(req.user);
    } else{
        res.sendStatus(401);
    }
};

