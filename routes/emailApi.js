var nodemailer = require('nodemailer');

function sendMail(email,password)
{
    console.log(email)
var transporter = nodemailer.createTransport({
    
    service: 'gmail',
  auth: {
    user: 'panchorerani@gmail.com',
    pass: '18041992@rani'
  }
});

var mailOptions = {
  from: 'panchorerani@gmail.com',
  to: email,
  subject: 'Verification mail from Awesome',
  html: "<h1>Welcome to Musico</h1><p>You have successfully registered on our application , your login credentials are attached below</p><h2>Username : "+email+"</h2><h2>Password : "+password+"</h2><h1>Click on the link below to verify account</h1>http://localhost:3002/verifyUser?email="+email
  
};

transporter.sendMail(mailOptions, (error, info)=>{
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
}

module.exports=sendMail