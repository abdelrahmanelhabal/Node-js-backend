const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // to link the static file 
// static file in the public folder
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const allRoute = require('./route/allroute');
const addUserRoute = require('./route/addUser');


// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

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
app.use(allRoute);
app.use(addUserRoute);