const  brandModel = require( "../../models/brandModel.js");
const  fs = require( 'fs');
class brandController {
    static allBrand = async (req,res) => {
        try {
                const brands = await brandModel.find({});
                res.render("backend/pages/brands/brands",{brands});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static addBrand = async (req,res) => {
        try {
            res.render("backend/pages/brands/addBrand");
        } catch (error) {
            console.log("Error",error)
        }
    }
    static storeBrand = async (req,res) => {
        try {
                var imgName = req.file
                if (!imgName) {
                  req.flash("fail", "Please upload Image!");
                  res.redirect("/admin/add-brand");
                } else {
                  imgName = req.file.filename;
            }
                     if (!req.body.categoryName) {
                       req.flash("fail", "Please Enter Name!");
                       res.redirect("/admin/add-brand");
                     } else {
                       const catDoc = brandModel({
                         name: req.body.categoryName,
                         image: imgName
                       });
                       await catDoc.save();
                       req.flash("success", "Brand Added Successfully!");
                       res.redirect("/admin/brand");
                     }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editBrand = async (req,res) => {
        try {
            const brand= await brandModel.findById({_id:req.params.id})
           
            res.render("backend/pages/brands/editBrand",{brand});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateBrand = async (req,res) => {
        try {
                const {cat_id,categoryName,old_image} = req.body
                var updated_image = old_image
                if(req.file){
                        updated_image = req.file.filename
                      await fs.unlink(`public/uploads/${old_image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
                }
                  const updated_cat = await  brandModel.findByIdAndUpdate(cat_id,{
                        name:categoryName,
                        image:  updated_image,
                    });
                    if(updated_cat)
                    {
                        req.flash('success', 'Brand Updated Succefully!!')
                        res.redirect('/admin/brand')
                    }
                    else{
                         req.flash('fail', 'Something went wrong! Please try again!')
                        res.redirect('/admin/brand')
                    }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static deleteBrand = async (req,res) => {
        try {
            const cId = req.params.id;
            const category = await brandModel.findById({_id:cId})
                  if(category.image){        
                    await fs.unlink(`public/uploads/${category.image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
            }
          const deleted = await brandModel.findByIdAndDelete({_id:cId});
          if(deleted)
          {
            req.flash("success","Brand Deleted Successfully!")
            res.redirect("/admin/brand");
          }
          else{
            req.flash("fail","Something went wrong! Please try again")
            res.redirect("/admin/brand");
          }
        } catch (error) {
            console.log("Error",error)
        }
    }
}

module.exports = brandController