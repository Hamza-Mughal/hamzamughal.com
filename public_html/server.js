var express = require("express");
var app = express();

app.use(express.static(__dirname + "/images/"));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
require("dotenv").config();
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
  console.log(req.body.name);
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    console.log("Didnt complete the recaptcha...");
    res.send("Mail Sent Successfully"
      + ". Return to homepage <a href='/'>here</a>.");
  }
  console.log("Captcha Success");

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
  res.setHeader("Content-Type", "text/html");
  res.sendFile("/html/error.html", {root: __dirname });
});
