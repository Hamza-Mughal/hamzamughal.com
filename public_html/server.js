var express = require("express");
var app = express();
var Request = require("request");
app.use(express.static(__dirname + "/images/"));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
require("dotenv").config();

var nodemailer = require("nodemailer");
var https = require("https");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hamzamughaldotcom@gmail.com",
    pass: process.env.EmailPassword
  }
});

console.log(process.env.FOO);
app.get("/", function(req, res){
  res.setHeader("Content-Type", "text/html");
  res.sendFile("/index.html", {root: __dirname });
});

app.get("/css/:fileName", function(req, res){
  res.setHeader("Content-Type", "text/css");
  res.sendFile("/css/" + req.params.fileName, {root: __dirname });
});

app.get("/html/:fileName", function(req, res){
  res.setHeader("Content-Type", "text/html");
  res.sendFile("/html/" + req.params.fileName, {root: __dirname });

});

app.post("/contact", function(req, res){

      let googleReq = "https://www.google.com/recaptcha/api/siteverify?secret="
  + process.env.key + "&response=" + req.body["g-recaptcha-response"]
  + "&remoteip=" + req.connection.remoteAddress;
  Request(googleReq, function(error, resp, body){
    body = JSON.parse(body);
    console.log(body.success);
    if(body.success === false){
      res.setHeader("Content-Type", "text/html");
      console.log("Didnt complete the recaptcha...");
      return res.send("The contact form was not filled out correctly"
        + ". Return to the contact page <a href='/contact'>here</a>.");
    }
  });
  if(req.body["g-recaptcha-response"] === undefined || req.body["g-recaptcha-response"] === "" || req.body["g-recaptcha-response"] === null)
  {

    res.setHeader("Content-Type", "text/html");
    console.log("Didnt complete the recaptcha...");
    res.send("The contact form was not filled out correctly"
      + ". Return to the contact page <a href='/contact'>here</a>.");
  }
  else{
    console.log("Captcha Success");
    var mailOptions = {
      from: req.body.email,
      to: "hmughal2@masonlive.gmu.edu",
      subject: req.body["email-title"],
      text: req.body.name + " (email: " + req.body.email
      + ") has sent a new message: \n\n" + req.body.body
    };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.setHeader("Content-Type", "text/html");
  res.send("Your email has been sent successfully."
  + ". Return to the home page <a href='/'>here</a>.");
  }
});

app.get("/contact", function(req, res){
  res.setHeader("Content-Type", "text/html");
  res.sendFile("/html/" + "contact.html", {root: __dirname });

});

app.get("/github", function(req, res){
  res.setHeader("Content-Type", "text/html");
  res.sendFile("/html/" + "github.html", {root: __dirname });

});

app.get("/games", function(req, res){
  res.setHeader("Content-Type", "text/html");
  res.sendFile("/html/" + "games.html", {root: __dirname });
});



app.get("/images/:fileName", function(req, res){
  res.setHeader("Content-Type", "text/image");
  res.sendFile("/images/" + req.params.fileName, {root: __dirname });
});

app.get("/js/:fileName", function(req, res){
  res.setHeader("Content-Type", "text/javascript");
  res.sendFile("/js/" + req.params.fileName, {root: __dirname });
});

app.listen(3002, function () {
  console.info("Port 3002");
});

app.get("*", function(req, res){
  res.status(404);
  res.setHeader("Content-Type", "text/html");
  res.sendFile("/html/error.html", {root: __dirname });
});
