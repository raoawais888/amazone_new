const nodemailer = require ("nodemailer");


const transporter = nodemailer.createTransport({

        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "leadtest77@gmail.com", // generated ethereal user
          pass: "ircfwaepudmxflnq", // generated ethereal password
        },
   

})

 module.exports =  transporter;