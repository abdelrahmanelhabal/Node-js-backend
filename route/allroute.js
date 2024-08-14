const express = require('express')
const router = express.Router()
const userData = require("../models/userSchema");
var moment = require('moment');
const userController = require("../control/userControl");
// GET REQUEST
router.get('/', userController.getHome);
  
router.get("/edit/:id", userController.getEdit);
  
router.get('/view/:id', userController.getView)
  
// POST REQUEST
router.post('/search',userController.getSearch );
  
router.delete("/edit/:id", userController.Delete);
  
router.put("/edit/:id",userController.Put); 

module.exports = router     