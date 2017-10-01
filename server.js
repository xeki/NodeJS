const fs = require('fs');
const express = require('express');
const hbs = require("hbs");

var app = express();
const port = process.env.PORT||3000;

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/Partials');
hbs.registerHelper('getCurrentYear',()=>{return new Date().getFullYear();});
hbs.registerHelper('screamIt',(text)=>{return text.toUpperCase();});

app.use((req,rsp,next)=>{
  var now = new Date().toString();
  console.log(now);
  fs.writeFileSync("log.txt",now);
  next();
});

// app.use((req,rsp,next)=>{
//   rsp.render('maintenance.hbs',{pageTitle:'maintainance page',message:'Sever is down for maintainance'});
// });
app.use(express.static(__dirname +'/public'));
app.get('/',(req,res)=>{
//res.send("<h1>Hello Express!</h1>");
// res.send({name:'Andrew',likes:['Sport','Gym','Movie']});
res.render('home.hbs',{pageTitle:'Home Page',welcomeMessage:'Welcome to the home page :D'} );
});

app.get("/about",(req,res)=>{
  res.render('about.hbs',{pageTitle:'About Page'});
});

app.get("/bad",(req,res)=>{
  res.send({id:10,message:"This is my JSON data"});
});

app.get("/project",(req,res)=>{
  res.render("project.hbs",{pageTitle:'Project Page', message:"This is going to serve as a project page"});
});

app.listen(port,()=>{console.log(`Server is up and running at port: ${port}`);});
