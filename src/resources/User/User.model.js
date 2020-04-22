import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName:{type:String,trim:true,lowercase:true},
    lastName:{type:String,trim:true,lowercase:true},
    email:{type:String,trim:true,lowercase:true},
    phoneNumber:{type:String,trim:true},
    password:{type:String,trim:true},
    userType:{type:String,trim:true, default:"user"},
    dateCreated:{type:Date, default:Date.now()},
    lastLogin:{type:Date},
    verified:{type:Boolean},
    addresses:{type:Boolean},
    tokens:{type:Boolean}

})

export default mongoose.model("User",userSchema)