const mongoose = require("mongoose");



const orderSchema = mongoose.Schema({

     orderNo :{type:Number,required:true,trime:true,unique:true},
     item : {type:Object, required:true, trim:true},
     status : {type:Boolean, required:true, trim:true},
     user_id:{type:mongoose.Types.ObjectId, ref:"user"},
     created_at:{type:Date , default:Date.now()}  
})


const orderModel = mongoose.model('order',orderSchema);

module.exports = orderModel;