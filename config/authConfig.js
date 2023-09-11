

const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

   const init = (passport) =>{
             
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

        const user = await User.findOne({email:email});
               

          if(!user){

            return done(null, false , {message:'Email Does Not Exist'});
          }

           

            if(await bcrypt.compare(password, user.password)){

              return done(null, user , {message:'login User'});

            }else{

               
                return done(null,false,{message:'invalid Username or password'});

            }


    }))


    
    passport.serializeUser((user, done) => {
      done(null, user._id);
  });
    
    passport.deserializeUser((id, done) => {
      try {
          User.findById(id, (err, user) => {
              if (err) {
                  done(err, null);
              } else {
                  done(null, user);
              }
          });
      } catch (error) {
          done(error, null);
      }
  });


   }

   module.exports = init
