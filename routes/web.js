const express =  require("express");
const passport =  require("passport");
const HomeController =  require("../controllers/HomeController.js");
const authController =  require("../controllers/authController.js");
const cartController =  require("../controllers/cartController.js");
const ensureAuthenticated =  require("../middleware/googleAuthMiddleware.js");
const checkoutController =  require("../controllers/checkoutController.js");
const guest = require("../middleware/Guest.js");



const router = express.Router();
router.get("/", HomeController.index);
router.get("/about", HomeController.about);
router.get("/product", HomeController.product);
router.get("/product-detail/:id", HomeController.product_detail);
router.get("/model/:id", HomeController.model_product);
router.get("/brands", HomeController.brands);
router.get("/testimonial", HomeController.testimonial);
router.get("/privacy-policy", HomeController.privacy);
router.get("/order", HomeController.order);
router.get("/order_detail/:order", HomeController.orderDetail);
router.get("/cart", HomeController.cart);
router.post("/add-cart", cartController.cart);
router.post("/update-cart", cartController.updateCart);
router.post("/delete_Cart", cartController.deleteCart);
router.get("/checkout", cartController.checkout);
router.post("/checkout", checkoutController.checkout);
router.get("/thankyou", checkoutController.thankyou);
router.post("/search",HomeController.search);
router.get("/mail",HomeController.mail);
router.post("/submit-review",HomeController.review);
router.post("/search_product",HomeController.search_product);

router.get("/register",guest, HomeController.register);
router.post("/register", authController.store);
router.get("/confirm_email/:id", authController.confrim_email);
router.get("/forgot_password", HomeController.forgot_password);
router.post("/forgot_password", authController.forgot_password_store);
router.get("/reset_password/:id", HomeController.reset_password);
router.post("/reset_password/:id", authController.reset_password_store);
router.get("/login",guest,HomeController.login);
router.post("/login", authController.auth);// Logout route
router.post("/logout", authController.logout);// Logout route


//Twitter Auth
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login',
}));



// Initiates the Google OAuth2 authentication process
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Completes the Google OAuth2 authentication process
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {

    // Successful authentication, redirect to the home page
    res.redirect('/');
  });


  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // This route requires authentication
    res.render('dashboard');
  });
module.exports = router ;
