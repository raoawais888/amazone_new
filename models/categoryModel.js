const mongoose =  require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {type:String, require: true,trim:true},
    brand:{type: mongoose.Types.ObjectId, ref:'brand'}
   
},{timestamps:true})

const categoryModel = mongoose.model('productCategory',CategorySchema)
module.exports = categoryModel;