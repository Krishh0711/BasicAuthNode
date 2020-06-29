const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('route is  running');

//to home controller
router.get('/', homeController.home);

//to user controller
router.use('/users',require('./users'));


module.exports = router;