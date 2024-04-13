const mongoose = require("mongoose");
// const validator = require("validator");
const Schema = mongoose.Schema;

const MSPSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mspId:{
    type: String,
    required:true,
    unique: true
  },
  date: {
    type: Date,
  },
  
});

const MSP = mongoose.model("MSPvalues", MSPSchema);
module.exports = MSP;