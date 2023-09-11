
const checkoutModel = require ("../../models/checkoutModel.js");
const orderModel = require("../../models/orderModel.js");
const categoryModel = require("../../models/categoryModel");
const moment  = require("moment");
class orderController {

    static order = async (req,res)=>{

        try {

   
    const order = await orderModel.find().sort({'created_at':-1});
    await res.render("backend/pages/order",{order});
            
        } catch (error) {
            
            console.log(error);
        }
    }


    static order_detail = async (req,res)=>{

        try {

            const order = req.params.order;
      
              const checkout = await checkoutModel.findOne({orderNo:order});
            
                 

              const order_detail = await orderModel.findOne({orderNo:order}).populate({
                path: 'user_id',
              });

            
               console.log(order_detail);
         
              const cart = Object.values(order_detail.item.items);
        
            
             
              const cartSession =order_detail.item;
          
              let CurrentDate = moment().format('YYYY-MM-DD');
               res.render("backend/pages/order_detail",{order,order_detail,cart,cartSession,CurrentDate,checkout});
        
         
            
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = orderController;