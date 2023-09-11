const mongoose =  require("mongoose");

const mobileSchema = mongoose.Schema({
    name: {type:String, require: true,trim:true},
    category: {type: mongoose.Types.ObjectId, ref: 'productCategory'},
    brand: {type: mongoose.Types.ObjectId, ref: 'brand'},
} , {timestamps:true})

const mobileModel = mongoose.model('mobile',mobileSchema)
module.exports = mobileModel;