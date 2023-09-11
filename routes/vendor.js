const  express =   require("express");
const upload =  require("../config/multerConfig.js");
const  vendorController = require("../controllers/vendor/vendorController.js");

const  vendorProductController = require( "../controllers/vendor/vendorProductController.js");
const vendorOrderController = require("../controllers/vendor/vendorOrderController.js")
const router = express.Router();


//Admin Routes
router.get("/",vendorController.index);
//Products Routes
router.get("/products", vendorProductController.allProduct);
router.get("/add-product", vendorProductController.addProduct);
router.post("/add-product", upload.single("productImg"),vendorProductController.storeProduct);
router.get("/edit-product/:id", vendorProductController.editProduct);
router.post("/edit-product/:id", upload.single("productImg"),vendorProductController.updateProduct);
router.get("/delete-product/:id",vendorProductController.deleteProduct);
router.get("/orders",vendorOrderController.index);


module.exports = router;