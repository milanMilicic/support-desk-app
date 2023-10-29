const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getMe, getUsers} = require('../controllers/userController');
const {protect, checkAdmin} = require('../middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);  //protected route

//Admin route
router.get('/admin/users', protect, checkAdmin, getUsers); //protected route + admin route

module.exports = router;
