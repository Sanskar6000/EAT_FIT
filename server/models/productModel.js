const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  calories: {
    type: Number,
    required: true,
  },
  nonVeg: {
    type: Boolean,
    default: false,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fibre: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Products', productSchema);
