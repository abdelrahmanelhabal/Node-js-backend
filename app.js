const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const userData = require("./models/userSchema");
app.set('view engine', 'ejs');
app.use(express.static('public')); // to link the static file 
// static file in the public folder
var moment = require('moment');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
// GET REQUEST
app.get('/', (req, res) => { 
  userData.find().then((result)=>{  
    res.render("index",{arr:result, moment:moment});
  }).catch((err)=>{
  console.log(err);
  })
});

app.get('/user/add.html', (req, res) => {
  res.render("user/add");
})

app.get("/edit/:id", (req, res) => {
  userData.findById(req.params.id).then((result) => {
    res.render("user/edit", { obj: result, moment: moment });
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/view/:id', (req, res) => {
  userData.findById(req.params.id).then((result)=>{
    res.render("user/view",{data:result, moment:moment});
  }).catch((err)=>{
   console.log(err);
  });
})

// POST REQUEST
app.post('/user/add.html', (req, res) => {
const userdata = new userData(req.body);
userdata.save().then(()=>{
  res.redirect('/');
}).catch((err)=>{
console.log(err);
});
});

app.delete("/edit/:id", (req, res) => {
  userData.deleteOne({_id: req.params.id})
    .then((result) => {
      res.redirect("/");
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

mongoose // connect the project with DataBase 
.connect("mongodb+srv://Elhabal:a1a2a3a4a5@cluster0.wnmcdi9.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`) 
      })
})
.catch((err) => {console.log(err)}); /*if the project cannot connect with the database then catch errors*/ 

const connectLivereload = require("connect-livereload");
const { styleText } = require('util');
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
