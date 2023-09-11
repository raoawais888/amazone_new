
const isAdmin = (req,res,next) => {
      if(req.user){
 
         if(req.user.userType == 1){
              
          next();

         }else{
          res.redirect("/");
         }

      }else{
        res.redirect("/");
      }
      
  }
 module.exports = isAdmin;