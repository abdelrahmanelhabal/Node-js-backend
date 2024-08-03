const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

app.get('/', (req, res) => {
  res.send('Hello World!llll')
})

mongoose
.connect("mongodb+srv://Elhabal:a1a2a3a4a5@cluster0.wnmcdi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`)
      })
})
.catch((err) => {console.log(err)});
