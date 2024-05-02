const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true,
        unique: true,
    },
    password:{
        type:String,
        require:true
    },
    otp:{
        type:Number,
    },
    is_verified:{
        type:Number,
        default:0 //1 when user verified 
    },
    created_date:{
        type:String
    },
    created_by:{
        type:String
    },
    updated_date:{
        type:String,
    },
    updated_by:{
        type:String
    }
    
});

module.exports=mongoose.model("astrocaptain_user",userSchema)