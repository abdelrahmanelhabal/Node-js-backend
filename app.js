const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const Data = require("./models/schema");

app.get('/', (req, res) => {
  res.sendFile('./view/index.html',{root: __dirname}); // send the html file 
})

app.get('/file.html', (req, res) => {
  res.send("<h1> Data was sent successfully </h1>") 
})
mongoose // connect the project with DataBase 
.connect("mongodb+srv://Elhabal:a1a2a3a4a5@cluster0.wnmcdi9.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`) 
      })
})
.catch((err) => {console.log(err)}); /*if the project cannot connect with the database then catch errors*/ 

app.post('/', (req, res) => {
console.log(req.body); // print the request body in console    
const data = new Data(req.body); // create object 
data.save().then(() => { // save the object in DataBase
  res.redirect('/file.html');  
}).catch((err)=>{
console.log(err);
}); 
  
})