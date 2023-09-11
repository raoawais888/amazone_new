const userModel = require("../../models/userModel.js");
class user {

    static index = async (req,res)=>{
        try {
            
            const user = await userModel.find();
           res.render("backend/pages/users",{user})
        } catch (error) {
            
            console.log(error);
        }
    }
    static status = async(req,res) => {
        try {
            const {value,user_id} = req.body;
            const update_user = await userModel.findByIdAndUpdate(user_id,{verified:value});
            if(update_user){ 
                  res.json({msg:'success'});  
              }else{
                res.json({msg:'error'});
              }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = user;