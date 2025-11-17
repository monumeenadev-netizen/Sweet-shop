const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      enum: ['hero', 'middle', 'footer'],
      default: 'hero',
    },
    backgroundColor: {
      type: String,
      default: '#007aff',
    },
    textColor: {
      type: String,
      default: '#ffffff',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);