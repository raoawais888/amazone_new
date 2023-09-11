const isVendor = (req,res,next) => {
  const user = req.session.user
    if(user.userType == 2)
    {
      next();
    }else{
      res.redirect('/')
    }
}
module.exports = isVendor;