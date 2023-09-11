const  productModel = require( "../../models/productModel.js");
const  categoryModel = require( "../../models/categoryModel.js");
const  fs = require( 'fs');
const BrandModel = require("../../models/brandModel.js");
const { product } = require("../HomeController.js");
class productController {
    static allProduct = async (req,res) => {
        try {

            

            const Products = await productModel.find().populate('category');
            console.log(Products)
            res.render("backend/pages/products/products",{products:Products})

        } catch (error) {
            console.log("Error",error)
        }
    }
    static product_verification = async(req,res) => {
        try {
            console.log(req.body);
            const{value,product_id} = req.body;
            const updated = await productModel.findByIdAndUpdate(product_id,{
                verified:value
            });
            if(updated){
                res.json({msg:'success'}); 
            }else{
                res.json({msg:'error'});
            }
        } catch (error) {
            console.log(error);
        }
    }
    static addProduct = async (req,res) => {
        try {
            const brands= await BrandModel.find({})
            res.render("backend/pages/products/addProduct",{brands})
        } catch (error) {
            console.log("Error",error)
        }
    }
    static storeProduct = async (req,res) => {
        try {
            const {pname,pprice,qty,pdesc,p_cat , brand , model} = req.body
               var img = req.file
                if(!img){
                    req.flash('fail','Please upload Image!')
                    res.redirect('/add-product')
                }
                else{
                    img = req.file.filename
                }
                
                if(!pname || !pprice || !p_cat || !qty  || !model || !brand )
                {
                    req.flash('fail','Please Fill All Fields!')
                    res.redirect('/admin/add-product')
                }
                else
                {
                    const ProductDoc = productModel ({
                        name: pname,
                        price: pprice,
                        category:p_cat,
                        brand:brand,
                        model:model,
                        stock:qty,
                        image:img,
                        desc:pdesc

                    })
                    await ProductDoc.save()
                    req.flash('success','Product Added Successfully!')
                    res.redirect('/admin/products')
                }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editProduct = async (req,res) => {
        try {
            const id = req.params.id
            const product = await productModel.findById({_id:id}).populate('category')
            const category = await categoryModel.find({})
            res.render("backend/pages/products/editProducts",{product:product, category:category})
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateProduct = async (req,res) => {
        try {
              const {pid,pname,qty,p_cat,old_image,pprice,pdesc} = req.body
                var updated_image = old_image;
           
                if(req.file)
                {
                    updated_image = req.file.filename
                      await fs.unlink(`public/uploads/${old_image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
                }
                    
                    const all_Products = await productModel.findByIdAndUpdate(pid,{
                        name:pname,
                        stock:qty,
                        price:pprice,
                        category:p_cat,
                        image:  updated_image,
                        desc:pdesc
                    });
                    if(all_Products)
                    {
                        req.flash('success', 'Product Updated Succefully!!')
                        res.redirect('/admin/products')
                    }
                       else{
                        req.flash('fail','Something went Wrong Please Try Again!!')
                        res.redirect('/admin/products')
                    }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static deleteProduct = async (req,res) => {
        try {
                 const id = req.params.id
                    const product = await productModel.findById(id)
                    if(product.image){        
                    await fs.unlink(`public/uploads/${product.image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
            }
                    const product_delete = await productModel.findByIdAndDelete(id)
                    if(product_delete)
                    {
                        req.flash('success','Product Deleted Successfully!!')
                        res.redirect('/admin/products')
                    }
                    else{
                        req.flash('fail','Something went Wrong Please Try Again!!')
                        res.redirect('/admin/products')
                    }
        } catch (error) {
            console.log("Error",error)
        }
    }
}
module.exports =  productController