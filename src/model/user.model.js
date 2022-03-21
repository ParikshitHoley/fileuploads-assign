const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:{type:String,require:true},
    last_name:{type:String,require:true},
    profile_pic:{type:String,required:false}
},{
    timestamps:true,
    versionKey:false
});


module.exports = mongoose.model("user",userSchema);