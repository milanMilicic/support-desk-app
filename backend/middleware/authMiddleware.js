const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];
            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Get user from token
            req.user = await User.findById(decoded.id).select('-password'); // everything except password and put it in user property of req object

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized');
            }
            next() //run next middleware
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized')
    }

})

//Admin middleware
const checkAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin')
    }
}

module.exports = {protect, checkAdmin}