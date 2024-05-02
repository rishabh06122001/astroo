const express = require('express');
const router = express.Router(); 

router.use(express.json());

const userController = require('../Controller/userController');

const {registerValidator,loginValidation}=require('../helper/validation')

router.post('/register', registerValidator,userController.userRegister);
router.post('/login',loginValidation,userController.loginUser);
router.post('/otp-verification/:id',userController.otpVerification);

module.exports = router; 
