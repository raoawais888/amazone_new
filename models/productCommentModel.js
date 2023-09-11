const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment:{type:String},
    user:{type: mongoose.Types.ObjectId, ref:'user'},
    product:{type: mongoose.Types.ObjectId, ref:'product'}
},
{timestamp:true}
);

const commentModel = mongoose.model('Product_Comment',commentSchema);

module.exports = commentModel;