const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Schema (the structure of the data)
const dataSchema = new Schema({
         userName: String
});

// Create a model based on that schema
const Data = mongoose.model("Data", dataSchema);

// export the model
module.exports = Data;