const express = require('express')
const bodyParser = require('body-parser');

const app = express();
var nodemailer = require('nodemailer');

const port = 4201;
app.use(express.json());

app.use(bodyParser.json());

app.use(function applyXFrame(req, res, next) {
  res.set('X-Frame-Options', 'DENY');
  next(); 
});

app.post('/register', (req, res) => { 
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'littlebonanzaz@gmail.com',
      pass: 'wdltgbvwlgrgkxel'
    }
  });

  var mailOptions = {
    from: 'j_adeyemo@yahoo.com',
    to: 'j_adeyemo@yahoo.com',    
    subject: 'Email from Book a Comic',
    html: '<strong>Name</strong>:'+ req.body.name+'<br/>'+
          '<strong>Email</strong>:'+ req.body.email+'<br/>'+
          '<strong>Phone</strong>:'+ req.body.phone+'<br/>'+
          '<strong>Comic name</strong>:'+ req.body.comicName+'<br/>'+
          '<strong>Note</strong>:'+ req.body.note+'<br/>'
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {      
      res.sendStatus(500);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
    return res;
  });

});


app.listen(port, () => {
  console.log(`Comic app listening at ${port}`)
})