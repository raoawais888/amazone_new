const express = require( "express");
const  upload = require  ("../config/multerConfig.js");
const adminController = require("../controllers/admin/adminController.js");
const  categoryController = require ("../controllers/admin/categoryController.js");
const  brandController = require ("../controllers/admin/brandController.js");
const  modelController = require ("../controllers/admin/modelController.js");
const  productController =  require("../controllers/admin/productController.js");
const  orderController =  require("../controllers/admin/orderController.js");
const  userController =  require("../controllers/admin/userController.js");
const  adminMiddleware  = require ("../middleware/adminMiddleware.js");
const router = express.Router();

router.use(adminMiddleware);

//Admin Routes
router.get("/",adminController.dashboard);
//Category Rotes
router.get("/category", categoryController.allCategory);
router.get("/add-category",categoryController.addCategory);
router.post("/add-category",categoryController.storeCategory);
router.get("/edit-category/:id",categoryController.editCategory);
router.post("/edit-category/:id", categoryController.updateCategory);
router.get("/delete-category/:id", categoryController.deleteCategory);



//Brands Rotes
router.get("/brand", brandController.allBrand);
router.get("/add-brand",brandController.addBrand);
router.post("/add-brand", upload.single("categoryImg"),brandController.storeBrand);
router.get("/edit-brand/:id",brandController.editBrand);
router.post("/edit-brand/:id", upload.single("categoryImg"), brandController.updateBrand);
router.get("/delete-brand/:id", brandController.deleteBrand);



//Models Rotes
router.get("/model", modelController.allModel);
router.get("/add-model",modelController.addModel);
router.post("/add-model",modelController.storeModel);
router.get("/edit-model/:id",modelController.editModel);
router.post("/edit-model/:id", modelController.updateModel);
router.get("/delete-model/:id", modelController.deleteModel);
router.post("/category-fetch", modelController.categoryFetch);
router.post("/model-fetch", modelController.modelFetch);



//Products Routes
router.get("/products", productController.allProduct);
router.get("/add-product", productController.addProduct);
router.post("/add-product", upload.single("productImg"),productController.storeProduct);
router.get("/edit-product/:id", productController.editProduct);
router.post("/edit-product/:id", upload.single("productImg"),productController.updateProduct);
router.get("/delete-product/:id",productController.deleteProduct);
router.post('/product-status',productController.product_verification);


// order routes
router.get("/orders",orderController.order);
router.get("/order_detail/:order",orderController.order_detail);
router.get("/users",userController.index);
router.post("/user-status",userController.status);



module.exports = router;