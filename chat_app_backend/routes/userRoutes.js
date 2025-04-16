const express = require('express');
const AuthMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const router = express.Router();





// Route to create a new user
router.post('/createUser', AuthMiddleware.verifyToken ,userController.createUser);
// Route to get all the users
router.get('/getAllUser', AuthMiddleware.verifyToken ,userController.getAllUsers);









module.exports = router;