const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req, res) => {
    
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        
        throw new Error('Provide all info');
    }

    res.send('Register Route');

})

const loginUser = asyncHandler(async (req, res) => {
        res.send('Login Route');
})

module.exports = {
    registerUser,
    loginUser
}