import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({
    productId:mongoose.Schema.Types.ObjectId,
    customer:{
        userId:{type:mongoose.Schema.Types.ObjectId},
          firstName:{type:String,lowercase:true},
          lastName:{type:String,lowercase:true},
          phone:{type:String,lowercase:true},
          email:{type:String,lowercase:true},
    },
    verified:{type:Boolean},
    dateCreated:{type:Date, default:Date.now()},
    store:{
        storeId:{type:mongoose.Schema.Types.ObjectId},
        name:{type:String,lowercase:true},
    }
})

export default mongoose.model("Review",reviewSchema);