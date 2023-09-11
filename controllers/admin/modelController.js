const  categoryModel = require( "../../models/categoryModel.js");
const  brandModel = require( "../../models/brandModel.js");
const  mobileModel = require( "../../models/mobileModel.js");
const  fs = require( 'fs');
class modelController {
    
    
    
    static allModel = async (req,res) => {
        try {
                const models= await mobileModel.find({}).populate('category').populate('brand');
                
                // console.log(models);
                
                res.render("backend/pages/models/models",{models});
        } catch (error) {
            console.log("Error",error)
        }
    }





    static addModel = async (req,res) => {
        try {
        const brands = await brandModel.find({});
        const categories = await categoryModel.find({});
            res.render("backend/pages/models/addModel",{brands,categories});
        } catch (error) {
            console.log("Error",error)
        }
    }


     static categoryFetch = async (req,res)=>{

            try {
                const {brand} = req.body;
                 
                   const categories = await categoryModel.find({brand:brand});
                     
                   if(categories){
                   
                        res.json({
                            msg:"fetch",
                           data:categories,
                        })
                      
                   }

                
            } catch (error) {
                console.log(error);
            }
     
    }

     static modelFetch = async (req,res)=>{

            try {
                const {brand} = req.body;
                 console.log(brand);
                   const categories = await mobileModel.find({category:brand});
                   if(categories){
                   
                        res.json({
                            msg:"fetch",
                           data:categories,
                        })
                      
                   }

                
            } catch (error) {
                console.log(error);
            }
     
    }



    static storeModel = async (req,res) => {
        try {


               console.log(req.body);

                   const {brand_id , category, model} = req.body;  
                   
            const cat_check = await brandModel.findOne({'category':category, brand:brand_id , name:model});
                                  
                    // console.log(cat_check);
                   
                   
                     if (!model) {
                       req.flash("fail", "Please Enter model!");
                       res.redirect("/admin/add-model");
                     }else if(cat_check) {

                        req.flash("fail", "Model Already Exist!");
                        res.redirect("/admin/add-model");
                     }else {
                       const catDoc = mobileModel({
                         category: category,
                          brand:brand_id,
                          name:model
                       });
                       await catDoc.save();
                       req.flash("success", "Model Added Successfully!");
                       res.redirect("/admin/model");
                     }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editModel = async (req,res) => {
        try {
            const cate = await categoryModel.findById({_id:req.params.id}).populate('brand');
            const brands = await brandModel.find({});
           
            res.render("backend/pages/categories/editCategory",{category:cate, brands});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateModel = async (req,res) => {
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
    static deleteModel = async (req,res) => {
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

module.exports = modelController