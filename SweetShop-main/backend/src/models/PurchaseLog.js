const mongoose = require('mongoose');

const purchaseLogSchema = new mongoose.Schema(
  {
    sweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sweet',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['purchase', 'restock'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PurchaseLog', purchaseLogSchema);
