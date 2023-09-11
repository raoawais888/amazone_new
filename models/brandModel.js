const mongoose =  require("mongoose");

const BrandSchema = mongoose.Schema({
    name: {type:String, require: true,trim:true},
    image: {type:String, require:true},
} , {timestamps:true})

const BrandModel = mongoose.model('brand',BrandSchema)
module.exports = BrandModel;