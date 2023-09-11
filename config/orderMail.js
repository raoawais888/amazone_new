const transporter = require( "../config/emailSend.js");

const sendEmail = (receiver, subject, content) => {
    ejs.renderFile(__dirname + '/templates/welcome.ejs', { receiver, content }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: 'email_username',
          to: receiver,
          subject: subject,
          html: data
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });
      }
    });
  };
  
  module.exports = sendEmail;