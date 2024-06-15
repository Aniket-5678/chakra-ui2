import mongoose from 'mongoose';



// Define the SKU schema
const skuSchema = new mongoose.Schema({
  selling_price: { type: Number, required: true },
  max_retail_price: { type: Number, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  quantity_in_inventory: { type: Number, required: true }
}, { _id: false });

// Define the Product schema
const productSchema = new mongoose.Schema({
  display_id: {
    type: Number,
    required: true
  },
  owner: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  characteristics: {
    type: String,
    required: true
  },
  features: {
    type: String
  },
  brand: {
    type: String,
    required: true
  },
  sku: {
    type: [skuSchema],
    required: true
  }
}, { timestamps: true });




// Export the Product model
export default mongoose.model('Product', productSchema);
