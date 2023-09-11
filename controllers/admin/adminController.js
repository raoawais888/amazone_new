class adminController {
    static dashboard = async (req,res) => {
       await res.render("backend/pages/dashboard");
    }
     
}

module.exports = adminController