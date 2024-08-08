const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const userData = require("./models/userSchema");
app.set('view engine', 'ejs');
app.use(express.static('public')); // to link the static file 
// static file in the public folder

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
// GET REQUEST
app.get('/', (req, res) => { 
  userData.find().then((result)=>{
    res.render("index",{arr:result});
  }).catch((err)=>{
  console.log(err);
  })
});

app.get('/user/add.html', (req, res) => {
  res.render("user/add");
})

app.get('/user/view.html', (req, res) => {
  res.render("user/view");
})

app.get('/user/edit.html', (req, res) => {
  res.render("user/edit");
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

mongoose // connect the project with DataBase 
.connect("mongodb+srv://Elhabal:a1a2a3a4a5@cluster0.wnmcdi9.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`) 
      })
})
.catch((err) => {console.log(err)}); /*if the project cannot connect with the database then catch errors*/ 

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
