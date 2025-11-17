const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200/00bcd4/ffffff?text=Sweet',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sweet', sweetSchema);