//app url
// https://powerful-tundra-60590.herokuapp.com/

const express = require('express');
const fs = require('fs');
 var app = express();
 const hbs = require('hbs');
 const port = process.env.PORT || 3000;
 hbs.registerPartials(__dirname + '/views/partials');
 //can inject data dynamically inside our templates
 //to render templates(dynamic html pages) using handlebars npm package
 app.set('view engine','hbs');


//Express middleware which keeps track of how our server is working
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server log',log + '\n');
  console.log(`${now}`);
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
//
// });
//to render static html files
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  //return text.toUpperCase();
});

app.get('/',(req,res) => {
   //res.send('<h1>Hello Express<h1>');
   res.render('home.hbs',{
      pageTitle:'Home page',
   });

});

app.get('/about',(req,res) => {
   //res.send('about page');
   res.render('about.hbs',{
      pageTitle:'About page',
   });
});

app.get('/projects',(req,res) => {
   //res.send('about page');
   res.render('projects.hbs',{
      pageTitle:'Projects page',
   });
});

app.get('/bad',(req,res) => {
   res.send({errorMessage:'unable to handle requests'});
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
