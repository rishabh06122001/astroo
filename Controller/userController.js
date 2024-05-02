const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const userRegister = async (req, res) => {
    try {
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: validate.array()
            });
        }

        const { name, mobile, password } = req.body;

        // Check if mobile number already exists
        const isExist = await User.findOne({ mobile });
        if (isExist) {
            return res.status(400).json({
                success: false,
                msg: 'Mobile number already exists'
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            mobile,
            password: hashPassword,
            created_date: new Date().toLocaleDateString('en-GB'), // Set the created_date field to the current date
            created_by: name,
            updated_date: null, // Assuming this will be updated later
            updated_by: null // Assuming this will be updated later
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return res.status(200).json({
            success: true,
            msg: 'Registered successfully',
            user: savedUser
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const loginUser=async(req,res)=>{
    try{  
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:"false",
                msg:"Errors",
                errors:errors.array()
            })
        }
        const {mobile,password}=req.body;
        const userData=await User.findOne({mobile})
        if(!userData){
            return res.status(400).json({
                success:false,
                msg:'mobile or Password is incorrect',
            })
        }
        const passwordmatch=await bcrypt.compare(password,userData.password)
        if(!passwordmatch){
            return res.status(401).json({
                success:false,
                msg:'mobile and Password is incorrect'
            })
        }
        return res.status(200).json({
            success:true,
            msg:'Login Successfully',
            user:userData,
        })
    }
    catch(error){
        return res.status(400).json({
            success:"False",
            msg:"error in login user",
            error:error.message
        })
    }
}

module.exports = {
    userRegister,
    loginUser
};