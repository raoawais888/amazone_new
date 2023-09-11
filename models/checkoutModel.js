const mongoose =  require("mongoose");

const checkout =  mongoose.Schema({

   fname:{type:String, required:true, trim:true},
   lname:{type:String, required:true, trim:true},
   email:{type:String, required:true, trim:true},
   address:{type:String, required:true, trim:true},
   address2:{type:String, trim:true},
   country:{type:String, required:true, trim:true},
   state:{type:String, required:true, trim:true},
   zip:{type:Number, required:true, trim:true},
   orderNo:{type:Number, required:true, trim:true , unique:true},
   user_id :{type:mongoose.Types.ObjectId , ref:"user"},
   created_at:{type:Date , default:Date.now()}

})


const checkoutModel = mongoose.model('checkout', checkout);

module.exports = checkoutModel;