

class vendorController {

    static index = async (req,res)=>{

        try {
            
            await res.render("vendor/pages/dashboard")

        } catch (error) {
            
            console.log(error);
        }
    }


}

module.exports = vendorController;