
const StrategyGoogle =  require('passport-google-oauth20');
const GoogleStrategy = StrategyGoogle.Strategy; 
const userModel  = require("../models/userModel.js");
const GoogleConfig = (passport) => {
passport.use(new GoogleStrategy(
  {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, cb) => {
//   Here, you can save the user information to your database
  
   const email = profile._json.email
   const name = profile._json.name

    const check = await userModel.findOne({email:email});
       if(!check){

           const userDoc = new userModel({
                  
            email:email,
            name:name,
            userType:3,
            isActive:1,


           })

          const user =   await userDoc.save();
           
          return cb(null, user);
       }else{

        return cb(null, check);
       }
}
));

passport.serializeUser((user, done) => {
  done(null, user._id);
  
});

passport.deserializeUser((id, done) => {
 User.findById(id,(err, user)=> {
  done(err, user);
});

}); 

}

module.exports = GoogleConfig;