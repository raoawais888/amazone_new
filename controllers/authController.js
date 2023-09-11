const userModel = require( "../models/userModel.js");
const categoryModel = require( "../models/categoryModel.js");
const bcrypt = require( "bcrypt");
const validator = require( "validator");
const passport = require( "passport");
const crypto = require("crypto");
const ejs = require('ejs');
const transporter = require("../config/emailSend.js");

class authController {

  
  
  static store = async (req, res) => {
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const category = await categoryModel.find();
      
      const { name, email,userType, pass, cpass } = req.body;
      const exist_email = await userModel.findOne({ email: email });
      if (!name || !email ||  !pass) {
        req.flash("fail", "Please Fill all fields!");
        res.redirect("/register");

      } else if (name.length < 3) {
        req.flash("fail", "Name will be at least 3 charcter!");
        res.redirect("/register");

      } else if (!validator.isEmail(email)) {
        req.flash("fail", "Please Enter valid Email!");
        res.redirect("/register");
      } else if (exist_email) {
        req.flash("fail", "Email already exist! Try Another");
        res.redirect("/register");
      } else if (pass.length < 8) {
        req.flash("fail", "Password Must be at least 8 charcters!");
        res.redirect("/register");
      } else if (pass != cpass) {
        req.flash("fail", "Password and Confirm Password Does't match!");
        res.redirect("/register");
      } else {
        const hashPassword = await bcrypt.hash(pass, 12);
        const userDoc = userModel({
          name: name,
          email: email,
          userType: userType,
          password: hashPassword,
          token:token
        });
        await userDoc.save();
        

            const html = `
            
            
<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
 
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; 
    -webkit-text-size-adjust: 100%;
  }
  
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  
  img {
    -ms-interpolation-mode: bicubic;
  }
  
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="http://amazon2amazon.com/" target="_blank" style="display: inline-block;">
                <img src="http://amazon2amazon.com/images/logo.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
              </a>
            </td>
          </tr>
        </table>
        </td>
        </tr>
        </table>
        
      </td>
    </tr>
    
    <tr>
      <td align="center" bgcolor="#e9ecef">
       
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
      
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
        
        </td>
        </tr>
        </table>
        
      </td>
    </tr>
    
    <tr>
      <td align="center" bgcolor="#e9ecef">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account , you can safely delete this email.</p>
            </td>
          </tr>
          
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="http://amazon2amazon.com/confirm_email/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Your email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
   
        </td>
        </tr>
        </table>
   
      </td>
    </tr>
   
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

         
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
            </td>
          </tr>
  
        </table>
          </td>
        </tr>
        </table>
        </td>
    </tr>
   
  </table>
</body>
</html>

            `;
      
  let info = await transporter.sendMail({
    from: '<info@amazon2amazon.com>', 
    to: email, 
    subject: "verify Your Email", 
    html: html, 
  });
  

                if(info.messageId){
                    req.flash("success", "User Registerd Successfully!");
                res.render("frontend/pages/verify",{category});
                }
  
 
       
       
      
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  


  static auth =  async (req, res , next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("fail", "Please Fill all fields!");
        res.redirect("/login");
      } 

      if (!validator.isEmail(email)) {
        req.flash("fail", "Please Enter valid Email!");
        res.redirect("/login");
      } 

      
      const emailcheck =  await userModel.findOne({email:email});
      if(emailcheck){
         if(emailcheck.isActive != 1){
          req.flash ('fail','Please Verify Your Email');
          res.redirect("/login");
         }
         if(emailcheck.verified != 1){
          req.flash ('fail','Account not verified by Admin! Please Contact Support');
          res.redirect("/login");
         }
      }


      passport.authenticate('local',async (err,user,info)=>{

        const message_show = await info.message;

         if(err){
          req.flash ('fail',info.message);
          return next(err);
          
         }

         if(!user){

          req.flash ('fail',info.message);
       
          res.redirect("/login");
         }

          req.logIn(user,(err)=>{

            if(err){
              req.flash ('fail',info.message);
              return next(err);
            }
            if(req.user.userType == 1){

              res.redirect("/admin")
            }
            if(req.user.userType == 2){
                  
              res.redirect("/vendor")

            }
            if(req.user.userType == 3){

              res.redirect("/")
            } 
            const userInfo = req.user;
            setAuthenticatedUser(userInfo); 
          })

      })(req,res,next);
        
      
    } catch (error) {
      console.log("Error", error);
    }
  };

  static confrim_email = async (req,res)=>{
    try {
      const token = req.params.id;
      
      const verify_token = await userModel.findOneAndUpdate({token:token}, {isActive:1});

      
      res.redirect("/login");      
      
    } catch (error) {
      console.log(error)
    }
  }


  
 
  static forgot_password_store = async(req,res)=>{
    try {
       
      const email = req.body.email;

      const emailcheck = await userModel.findOne({$and : [ {email:email} , {isActive:1}] });
   
        
     
      if(!emailcheck){
        req.flash("fail","Email Not Exist");
        res.redirect("/forgot_password");

      }else{
        
             
        const token = emailcheck.token;
        
        const html = `
        
<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
 
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
 
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; 
    -webkit-text-size-adjust: 100%;   }
 
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  
  img {
    -ms-interpolation-mode: bicubic;
  }
 
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
       
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="#" target="_blank" style="display: inline-block;">
                <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
              </a>
            </td>
          </tr>
        </table>
       
      </td>
    </tr>
   
    <tr>
      <td align="center" bgcolor="#e9ecef">
     
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
       
      </td>
    </tr>
    
    <tr>
      <td align="center" bgcolor="#e9ecef">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

        
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to  Reset Your Password.</p>
            </td>
          </tr>
       
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="http://localhost:8000/reset_password/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset Your Password</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
         

        </table>
      
      </td>
    </tr>
   
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
       
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

      
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
          
            </td>
          </tr>
         

        </table>
     
      </td>
    </tr>


  </table>


</body>
</html>

        `;
        let info = await transporter.sendMail({
          from: '<info@amazon2amazon.com>', 
          to: email, 
          subject: "Forgot Your Password", 
          html: html, 
        });
        
      
                      if(info.messageId){
                        req.flash("success","password Reset link sent on your email");
                        res.redirect("/forgot_password");
                      }
        
    

      


      }
       



    } catch (error) {
      console.log(error);
    }
  }
  

 


  static reset_password_store = async (req,res)=>{
    try {


      const token = req.params.id;
       const password =  req.body.password;
       const user = await userModel.findOne({token:token});
       if(!user){
        req.flash("success", "invalid token");
        res.redirect("/login");

       }
       const id = user._id;
       const newToken = crypto.randomBytes(20).toString('hex');
         const    hashpasword = await bcrypt.hash(password,10);
     
       await  userModel.findByIdAndUpdate(id,{
        password : hashpasword ,
        token:newToken

       },(error,updateDoc)=>{
            
        if(error){
          console.log(error);
        }else{
          req.flash("success", "New Password Updated Successfully");
          res.redirect("/login");
        }


       })
          


        
        

    } catch (error) {
      
      console.log(error);
    }
  }

  static logout = async (req,res)=>{
    try {
      
      req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
      });

    } catch (error) {
      
      console.log(error);
    }
  } 
}
 module.exports = authController;
