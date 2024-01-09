const express = require('express');
const { addUser, getUserInfo, login } = require('../controllers/userController');
const router = express.Router();

router.post('/add', addUser); // Route for adding a new user
router.post('/login', login); // Route for user login
router.get('/:username', getUserInfo); // Route to get user information

module.exports = router;
