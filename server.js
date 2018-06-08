const express = require('express');
const hbs = require('hbs'); //Handle bars
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

// app.use((req,res) =>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  log = `${now} ${req.method} ${req.path}`
  console.log(log);
  fs.appendFile('server.log',log,(err) => {
    if(err){
      console.log('Error appending file' + err);
    }
  })
  next();
})
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
})
app.get('/', (req,res) => {
  // res.send({
  //   name: 'Rama',
  //   likes: [
  //     'hiking',
  //     'biking'
  //   ]
  // })
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to my home page',
  });
});

app.get('/about',(req,res) => {
  //  res.send('About Express');
  res.render('about.hbs',{
    pageTitle: 'About Page...',
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to fulfil your request'
  });
});
app.listen(port , () =>{
  console.log(`Server is running on port ${port}`)
});
