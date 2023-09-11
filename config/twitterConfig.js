const userModel = require("../models/userModel");
const TwitterStrategy = require('passport-twitter').Strategy;

const TwitterConfig =  (passport) => {
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/twitter/callback"
  },
  async (token, tokenSecret, profile, cb) => {

      const name = profile.displayName;
      const username = profile.username;
       const check = await userModel.findOne({userName:username});
       if(!check){
           const userDoc = new userModel({
            userName:username,
            name:name,
            userType:3,
            isActive:1,
            verified:1
           });
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
module.exports = TwitterConfig;