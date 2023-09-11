const mongoose =  require ("mongoose");
const userSchema = mongoose.Schema({
    name: {type: String, require:true},
    email: { type: String, require: true, unique: true },
    userName:{type: String, unique:true},
    userType: { type: Number, require: true },
    isActive: {type: Number, default: 0},
    verified:{type:Number,default:0},
    password: {type: String},
    token: {type: String,  trim:true},
    created_at: {type:Date, default:Date.now}
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel