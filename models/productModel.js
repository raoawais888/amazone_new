const  mongoose =  require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {type:String, require:true, trim:true},
    image: {type:String, require:true},
    price: {type:Number, require:true, trim:true},
    stock: {type:Number, require:true, trim:true},
    verified:{type:Number,default:0},
    category: {type: mongoose.Types.ObjectId, ref: 'productCategory'},
    brand: {type: mongoose.Types.ObjectId, ref: 'brand'},
    model: {type: mongoose.Types.ObjectId, ref: 'mobile'},
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    desc: {type: String},
    created_at: {type:Date, default:Date.now}
})

const productModel = mongoose.model('product',ProductSchema)

module.exports =  productModel