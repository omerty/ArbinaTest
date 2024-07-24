import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;