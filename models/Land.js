const { Schema, model } = require("mongoose");

const schema = new Schema({
  area: {
    type: Number,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = model("Land", schema);
