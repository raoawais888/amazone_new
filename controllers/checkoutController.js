
const checkoutModel = require("../models/checkoutModel.js");
const orderModel = require("../models/orderModel.js");
const categoryModel = require( "../models/categoryModel.js");
const ejs = require('ejs');
const transporter = require("../config/emailSend.js");
const moment  = require("moment");
const path = require('path');

class checkout {

  static checkout = async (req , res) =>{

    try {
        
   const {fname,lname,email,address,address2,country,state,zip} = req.body;
   let order = Math.floor((Math.random() * 100088800000) + 1);   
  

    const user_id = req.user._id;
    const useremail = req.user.email;
    const username = req.user.name;
    const item = req.session.cart
       const checkoutDoc = new checkoutModel({
        fname:fname,
        lname:lname,
        email:useremail,
        address:address,
        address2:address2,
        country:country,
        state:state,
        zip:zip,
        user_id:user_id,
        orderNo:order
       })

       const orderDOC = new orderModel({
        orderNo:order,
        item:item,
        status:0,
        user_id:user_id

       })

       await checkoutDoc.save();
       await orderDOC.save();


       
      //  email send after order 
      const cart = Object.values(req.session.cart.items);
      const userDetail = req.user;
      const cartSession =req.session.cart;
      let CurrentDate = moment().format('YYYY-MM-DD');
      
       
    

      const templatePath = path.join(process.cwd(), "views/mails/order.ejs")
    
    ejs.renderFile(templatePath, {cart , order, userDetail,cartSession,CurrentDate,address}, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          // Send the email
          const mailOptions = {
           
          from: '<info@amazon2amazon.com>', 
          to: useremail, 
          subject: "Order Confirmation", 
          html: data, 
        
          };
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).send(error);
            } else {
               
              delete  req.session.cart;
              req.flash("sucsess","Thank You For The Order d")
              res.redirect("/thankyou");
                
            
              
            }
          });
        }
      });
      //  email send after order 


    } catch (error) {
        
        console.log(error);
    }




  }

    

  
  static thankyou =  async (req,res)=>{

    try {
      const category = await categoryModel.find();
      res.render("frontend/pages/thankyou",{category});
    } catch (error) {
      
      console.log(error);
    }
  }

}

module.exports = checkout