// models/salesOrder.model.js

import mongoose from 'mongoose';

const salesOrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'complete'],
        default: 'active', // Default status can be 'active'
    },
});
const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

export default SalesOrder;

