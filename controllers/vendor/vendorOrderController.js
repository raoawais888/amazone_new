
class vendorOrderController {


    static index = async  (req,res)=>{

        try {
            
            res.render("vendor/order")
        } catch (error) {
            
            console.log(error);
        }
    }

}


module.exports = vendorOrderController;