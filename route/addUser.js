const express = require('express')
const router = express.Router()
const userController = require("../control/userControl");


// GET
router.get('/user/add.html',userController.add);

// POST
router.post('/user/add.html',userController.postAdd);

module.exports = router  