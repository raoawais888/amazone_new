const  categoryModel = require( "../../models/categoryModel.js");
const  brandModel = require( "../../models/brandModel.js");
const  fs = require( 'fs');
class categoryController {
    static allCategory = async (req,res) => {
        try {
                const categories = await categoryModel.find({}).populate('brand');
                
                res.render("backend/pages/categories/Categories",{categories:categories});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static addCategory = async (req,res) => {
        try {
        const brands = await brandModel.find({});
            res.render("backend/pages/categories/addCategory",{brands});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static storeCategory = async (req,res) => {
        try {


                   const {brand_id , categoryName} = req.body;  
                   
                   const cat_check = await brandModel.findOne({'name':categoryName, brand:brand_id});
                                  
                   
                   
                   
                     if (!categoryName) {
                       req.flash("fail", "Please Enter Name!");
                       res.redirect("/admin/add-category");
                     }else if(cat_check) {

                        req.flash("fail", "Category Already Exist!");
                        res.redirect("/admin/add-category");
                     }else {
                       const catDoc = categoryModel({
                         name: req.body.categoryName,
                          brand:brand_id
                       });
                       await catDoc.save();
                       req.flash("success", "Category Added Successfully!");
                       res.redirect("/admin/category");
                     }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editCategory = async (req,res) => {
        try {
            const cate = await categoryModel.findById({_id:req.params.id}).populate('brand');
            const brands = await brandModel.find({});
           
            res.render("backend/pages/categories/editCategory",{category:cate, brands});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateCategory = async (req,res) => {
        try {
            console.log(req.body);

                const {cat_id,categoryName , brand} = req.body
                
               
                  const updated_cat = await  categoryModel.findByIdAndUpdate(cat_id,{
                        name:categoryName,
                        brand:brand,
                    });
                    if(updated_cat)
                    {
                        req.flash('success', 'Category Updated Succefully!!')
                        res.redirect('/admin/category')
                    }
                    else{
                         req.flash('fail', 'Something went wrong! Please try again!')
                        res.redirect('/admin/category')
                    }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static deleteCategory = async (req,res) => {
        try {
            const cId = req.params.id;
            const category = await categoryModel.findById({_id:cId})
                  if(category.image){        
                    await fs.unlink(`public/uploads/${category.image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
            }
          const deleted = await categoryModel.findByIdAndDelete({_id:cId});
          if(deleted)
          {
            req.flash("success","Category Deleted Successfully!")
            res.redirect("/admin/category");
          }
          else{
            req.flash("fail","Something went wrong! Please try again")
            res.redirect("/admin/category");
          }
        } catch (error) {
            console.log("Error",error)
        }
    }
}

module.exports = categoryController