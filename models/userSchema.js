const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Schema (the structure of the data)
const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Telephone: String,
    Age: String,
    Country: String,
    Gender: String
});

// Create a model based on that schema
const userData = mongoose.model("userData", userSchema);

// export the model
module.exports = userData;