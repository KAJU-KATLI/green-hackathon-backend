const { Schema, model } = require("mongoose");

const schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amountInKG: {
    type: Number,
    required: true,
  },
  pricePerKG: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = model("Crop", schema);
