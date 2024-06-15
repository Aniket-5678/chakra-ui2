import mongoose from "mongoose";

const customerProfileSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  color: [{ type: Number, required: true }],
  email: { type: String, required: true },
  pincode: { type: String, required: true },
  location_name: { type: String, required: true },
  type: { type: String, required: true },
  profile_pic: { type: String, default: null },
  gst: { type: String, default: "" }
});

const customerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  customer: { type: Number, required: true },
  customer_profile: { type: customerProfileSchema, required: true }
});

export default  mongoose.model('Customer', customerSchema);
