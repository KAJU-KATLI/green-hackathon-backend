const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const accountDetailsSchema = new Schema({
  accountHolder: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  IFSCCode: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
});

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required:true,
  },
  // accountDetails: {
  //   type: accountDetailsSchema,
  //   required: true,
  // },
  password: {
    type: String,
    required:true
  },
  who: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

schema.plugin(passportLocalMongoose);


module.exports = model("User", schema);
