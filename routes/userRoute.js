const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);


module.exports = router;