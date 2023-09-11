const env  = require("dotenv");
env.config();

const passport = require('passport');
// const   Facebook  =  require('passport-facebook');
// const FacebookStrategy = Facebook.Strategy;


const express = require( "express");
const web = require("./routes/web.js");
const  admin = require("./routes/admin.js");
const vendor = require("./routes/vendor.js");
const  path =  require ("path");
const CONNECT_DB = require ("./db/connection.js");
const  flash = require ("connect-flash");
const  session = require("express-session");
const cookieParser =   require("cookie-parser");
const cors = require("cors");
const  MongoStore =  require( "connect-mongo") ;
const GoogleConfig = require('./config/googleConfig.js');
const TwitterConfig = require('./config/twitterConfig.js');
const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;




app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());

  const mongoaDBStore = new MongoStore({
    mongoUrl:DB_URL,
    dbName: process.env.DB_NAME
  })
app.use(
  session({
    name: "waqas",
    secret: "awais don",
    store:mongoaDBStore,
    cookie: { maxAge: 1000*60*60*24 },
    resave: false,
    saveUninitialized: false,
  })
);


const LocalPassport  =  require("./config/authConfig.js");
LocalPassport(passport);
GoogleConfig(passport);
TwitterConfig(passport);

app.use(passport.initialize());
app.use(passport.session());




// facebook login  

// passport.use(new FacebookStrategy({
//   clientID: "507202154822583",
//   clientSecret: "0aa29b1ff2c0bd4cf6a67892cd2b0ebc",
//   callbackURL: "http://localhost:8000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   // User has been authenticated, do something with the data
// }));



// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


  // app.get('/profile', passport.authenticate('facebook'), function(req, res) {
  //   // Render the user's profile page
  //   res.render('profile', { user: req.user });
  // });










app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  
  next();
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});



app.use(express.urlencoded({extended:true}));
app.use("/", web);

app.use("/vendor", vendor);

app.use("/admin", admin);


app.set("view engine", "ejs");

CONNECT_DB(DB_URL);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});



  


