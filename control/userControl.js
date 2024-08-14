const userData = require("../models/userSchema");
var moment = require('moment');

const getHome = (req, res) => { 
    userData.find().then((result)=>{  
      res.render("index",{arr:result, moment:moment});
    }).catch((err)=>{
    console.log(err);
    })
  }

 const getEdit = (req, res) => {
    userData.findById(req.params.id).then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
}

const getView = (req, res) => {
    userData.findById(req.params.id).then((result)=>{
      res.render("user/view",{data:result, moment:moment});
    }).catch((err)=>{
     console.log(err);
    });
}

const getSearch = (req, res) => {
    const search =   req.body.searchText.trim();
    userData.find({ $or: [{FirstName:search},{LastName:search},{Age:search}]}).then((result)=>{
        res.render("user/search",{data:result});
      }).catch((err)=>{ 
        console.log(err);
      })
}
const Delete = (req, res) => {
    userData.deleteOne({_id: req.params.id})
      .then((result) => {
        res.redirect("/");
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
}

const Put =  (req, res) => {
    userData.updateOne({_id: req.params.id}, req.body)
      .then(() => {
        res.redirect("/");
    }).catch((err)=>{
     console.log(err);
    });
  }

const add =  (req, res) => {
    res.render("user/add");
}

const postAdd =  (req, res) => {
    userData.create(req.body).then(()=>{
    res.redirect('/');
}).catch((err)=>{
console.log(err);
});
} 
module.exports  = {getSearch,getView,getEdit,getHome,Delete,Put,add,postAdd};