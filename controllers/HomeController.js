
const productModel = require ("../models/productModel.js");
const orderModel = require("../models/orderModel.js");
const categoryModel = require("../models/categoryModel");
const commentModel = require("../models/productCommentModel.js");
const brandModel = require("../models/brandModel.js");
const moment  = require("moment");
const nodemailer = require ("nodemailer");
const { use } = require("passport");
const mobileModel = require("../models/mobileModel.js");
class HomeController {


    // index function ..........................................

  static index = async (req, res) => {
    try {
    const product = await productModel.find({verified:1});
    const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
    const category = await categoryModel.find();

      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
      const active = 'home';
      res.render("frontend/pages/home",{product ,brands, latest_product,category,active , data:p_data });
     
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }

   
  };



      //  about function start /...................................

  static about = async (req, res) => {
    try {
      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/about",{data:p_data , category , product , latest_product});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  // product function start .............................................

  static product = async (req, res) => {
    try {
      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/product",{data:p_data , category , product , latest_product});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  



  // product deatail function .......................................

  static product_detail = async (req, res) => {
    


    try {
      const id = req.params.id;
      const detail = await productModel.findById({_id:id})
      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
     const comments = await commentModel.find({product:detail._id}).populate('user');
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/product_detail",{data:p_data , category , product , latest_product , detail:detail,comments:comments});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //  model prouct function .......................................




    static model_product = async (req,res)=>{
    try {
      const id = req.params.id;
      const product = await productModel.find({model:id , verified: 1})
    
     
      // const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/product",{data:p_data , category , product});
      
    } catch (error) {
      console.log(error);
    }

    }





    //  review function .......................................................






  static review = async(req,res) => {
      const{user,product,comment} = req.body;
      const commentDoc = new commentModel({
            comment:comment,
            user:user,
            product:product
      });
        await commentDoc.save();
        req.flash('success',"Your review submited");
        return res.redirect('back');
  }



  // brands function /...........................................................


  static brands = async (req, res) => {
   

  

    try {
      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/why",{data:p_data , category , product , latest_product,brands});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };






          // testimonial function .................................................



  static testimonial = async (req, res) => {
    try {
      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/testimonial",{data:p_data , category , product , latest_product});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  //  dashboard function ......................................
   
  static dashboard = async (req, res) => {
    await res.render("vendor/pages/dashboard");
  };







  // privacy function .......................................................



  static privacy = async (req, res) => {
    try {
      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/privacy_policy",{data:p_data , category , product , latest_product});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  //  order function .....................................................



  static order = async (req, res) => {

    try {
      const user_id = req.user._id;
      const order = await orderModel.find({user_id:user_id}).sort({'created_at':-1});
      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      res.render("frontend/pages/testimonial",{data:p_data , category , product , latest_product , order});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };


        //  order detail function ...............................


  static orderDetail = async (req,res)=>{




       try {

        const order = req.params.order;
        
          const order_detail = await orderModel.findOne({orderNo:order});
          const cart = Object.values(order_detail.item.items);
    
        
          const userDetail = req.user;
          const cartSession =order_detail.item;
      
          let CurrentDate = moment().format('YYYY-MM-DD');

        const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
        const product = await productModel.find({ verified: 1 });
        const category = await categoryModel.find();
        const brands = await brandModel.find({});
    
        const p_data = [];
    
        for (const brand of brands) {
          const brand_data = {
            brand: {
              name: brand.name,
              category: [],
            },
          };
           const fetchCat = await categoryModel.find({brand:brand._id});
          
    
          for (const category of fetchCat) {
            if (category.brand.toString() === brand._id.toString()) {
              const category_data = {
                name: category.name,
                model: [],
              };
              
                const model = await mobileModel.find({category:category._id , brand : brand._id });
  
  
              for (const product of model) {
                if (product.category.toString() === category._id.toString()) {
                
              
                  category_data.model.push(product);
                }
              }
    
              brand_data.brand.category.push(category_data);
            }
          }
    
          p_data.push(brand_data);
  
                
  
        }
               
       
        res.render("frontend/pages/orderDetail",{data:p_data , category , product , latest_product , order,order_detail,cart,userDetail,cartSession,CurrentDate});
        // Now, you can use the populated p_data as needed in your response or further processing.
        // res.json(p_data);
      } catch (error) {
        console.error(error);
        // Handle errors and send an appropriate response.
        // res.status(500).json({ error: 'Internal Server Error' });
      }
 


  }


  static search = async(req,res)=>{
    try {
      const category = await categoryModel.find();
       const{categoryS,search} = req.body;
      
      const categorySearch = await categoryModel.find({name:categoryS});
      const cat_id = await categorySearch._id;
     const product = productModel.find({$or:[{category: cat_id},{name:search}]}, function(err, product) 
 {
    if (err)
    {
        res.send(err);
    }
       
       res.render("frontend/pages/product_search",{product,search,category});



       

 });

     

      
         


    } catch (error) {
      
      console.log(error);
    }
  }

  static mail = async (req,res)=>{
    try {
      
      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.amazon2amazon.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "info@amazon2amazon.com", // generated ethereal user
      pass: "RCy262@f", // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <info@amazon2amazon.com>', // sender address
    to: "raoawais888@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
 
    } catch (error) {
      
      console.log(error);
    }
  }



   static search_product = async (req,res)=>{
    try {
       const {search} = req.body
      
      const product =  await  productModel.find({ name: { $regex: new RegExp(search, 'i') } });
        
      res.json({
        data:product
      })
    
    
    } catch (error) {
      console.log(error);
    }
   }



   static cart = async (req,res)=>{
    try {

      const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
   
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);

              

      }
             
     
      if(!req.session.cart){
        res.render("frontend/pages/cart",{category , data:p_data , latest_product });
      
    }else{
       
        var cart = Object.values(req.session.cart.items);
        res.render("frontend/pages/cart",{cart,category , data:p_data , latest_product })
    }

     
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
   }


      // register function ..................................


      static register = async (req, res) => {
    
        try {
          const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
          const product = await productModel.find({ verified: 1 });
          const category = await categoryModel.find();
          const brands = await brandModel.find({});
      
          const p_data = [];
      
          for (const brand of brands) {
            const brand_data = {
              brand: {
                name: brand.name,
                category: [],
              },
            };
             const fetchCat = await categoryModel.find({brand:brand._id});
            
      
            for (const category of fetchCat) {
              if (category.brand.toString() === brand._id.toString()) {
                const category_data = {
                  name: category.name,
                  model: [],
                };
                
                  const model = await mobileModel.find({category:category._id , brand : brand._id });
    
    
                for (const product of model) {
                  if (product.category.toString() === category._id.toString()) {
                  
                
                    category_data.model.push(product);
                  }
                }
      
                brand_data.brand.category.push(category_data);
              }
            }
      
            p_data.push(brand_data);
    
                  
    
          }
                 
         
          res.render("frontend/pages/register",{data:p_data , category , product , latest_product});
          // Now, you can use the populated p_data as needed in your response or further processing.
          // res.json(p_data);
        } catch (error) {
          console.error(error);
          // Handle errors and send an appropriate response.
          // res.status(500).json({ error: 'Internal Server Error' });
        }
      };




      // login function ........................................

      static login = async (req, res) => {
        try {
          const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
          const product = await productModel.find({ verified: 1 });
          const category = await categoryModel.find();
          const brands = await brandModel.find({});
      
          const p_data = [];
      
          for (const brand of brands) {
            const brand_data = {
              brand: {
                name: brand.name,
                category: [],
              },
            };
             const fetchCat = await categoryModel.find({brand:brand._id});
            
      
            for (const category of fetchCat) {
              if (category.brand.toString() === brand._id.toString()) {
                const category_data = {
                  name: category.name,
                  model: [],
                };
                
                  const model = await mobileModel.find({category:category._id , brand : brand._id });
    
    
                for (const product of model) {
                  if (product.category.toString() === category._id.toString()) {
                  
                
                    category_data.model.push(product);
                  }
                }
      
                brand_data.brand.category.push(category_data);
              }
            }
      
            p_data.push(brand_data);
    
                  
    
          }
                 
         
          res.render("frontend/pages/login",{data:p_data , category , product , latest_product});
          // Now, you can use the populated p_data as needed in your response or further processing.
          // res.json(p_data);
        } catch (error) {
          console.error(error);
          // Handle errors and send an appropriate response.
          // res.status(500).json({ error: 'Internal Server Error' });
        }
      };


      static reset_password = async (req,res)=>{

        try {
          const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
          const product = await productModel.find({ verified: 1 });
          const category = await categoryModel.find();
          const brands = await brandModel.find({});
      
          const p_data = [];
      
          for (const brand of brands) {
            const brand_data = {
              brand: {
                name: brand.name,
                category: [],
              },
            };
             const fetchCat = await categoryModel.find({brand:brand._id});
            
      
            for (const category of fetchCat) {
              if (category.brand.toString() === brand._id.toString()) {
                const category_data = {
                  name: category.name,
                  model: [],
                };
                
                  const model = await mobileModel.find({category:category._id , brand : brand._id });
    
    
                for (const product of model) {
                  if (product.category.toString() === category._id.toString()) {
                  
                
                    category_data.model.push(product);
                  }
                }
      
                brand_data.brand.category.push(category_data);
              }
            }
      
            p_data.push(brand_data);
    
                  
    
          }
                 
         
          res.render("frontend/pages/reset_password",{data:p_data , category , product , latest_product});
          // Now, you can use the populated p_data as needed in your response or further processing.
          // res.json(p_data);
        } catch (error) {
          console.error(error);
          // Handle errors and send an appropriate response.
          // res.status(500).json({ error: 'Internal Server Error' });
        }
    
      }

      static forgot_password = async (req,res)=>{

        try {
          const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
          const product = await productModel.find({ verified: 1 });
          const category = await categoryModel.find();
          const brands = await brandModel.find({});
      
          const p_data = [];
      
          for (const brand of brands) {
            const brand_data = {
              brand: {
                name: brand.name,
                category: [],
              },
            };
             const fetchCat = await categoryModel.find({brand:brand._id});
            
      
            for (const category of fetchCat) {
              if (category.brand.toString() === brand._id.toString()) {
                const category_data = {
                  name: category.name,
                  model: [],
                };
                
                  const model = await mobileModel.find({category:category._id , brand : brand._id });
    
    
                for (const product of model) {
                  if (product.category.toString() === category._id.toString()) {
                  
                
                    category_data.model.push(product);
                  }
                }
      
                brand_data.brand.category.push(category_data);
              }
            }
      
            p_data.push(brand_data);
    
                  
    
          }
                 
         
          res.render("frontend/pages/forgot_password",{data:p_data , category , product , latest_product});
          // Now, you can use the populated p_data as needed in your response or further processing.
          // res.json(p_data);
        } catch (error) {
          console.error(error);
          // Handle errors and send an appropriate response.
          // res.status(500).json({ error: 'Internal Server Error' });
        }
      }


}

module.exports =  HomeController;
