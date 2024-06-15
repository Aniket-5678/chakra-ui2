// controllers/salesOrderController.js

import SalesOrder from '../models/sales.model.js';

// Create a new sales order
export const createSalesOrderController = async (req, res) => {
    const { orderNumber, customer, products, totalAmount, status  } = req.body;

    try {
        const newSalesOrder = new SalesOrder({
            orderNumber,
            customer,
            products,
            totalAmount,
            status: status || 'active',
        });

        const savedSalesOrder = await newSalesOrder.save();
        res.status(201).json(savedSalesOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all sales orders
export const getAllSalesOrdersController = async (req, res) => {
    try {
        const salesOrders = await SalesOrder.find().populate('customer', 'name').populate('products.product', 'name');
        res.status(200).json(salesOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single sales order by ID
export const getSingleSalesOrderController = async (req, res) => {
    const { id } = req.params;

    try {
        const salesOrder = await SalesOrder.findById(id).populate('customer', 'name').populate('products.product', 'name');
        
        if (!salesOrder) {
            return res.status(404).json({ message: 'Sales order not found' });
        }

        res.status(200).json(salesOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sales order by ID
export const updateSalesOrderController = async (req, res) => {
    const { id } = req.params;
    const { orderNumber, customer, products, totalAmount } = req.body;

    try {
        const updatedSalesOrder = await SalesOrder.findByIdAndUpdate(
            id,
            { orderNumber, customer, products, totalAmount },
            { new: true }
        ).populate('customer', 'name').populate('products.product', 'name');

        if (!updatedSalesOrder) {
            return res.status(404).json({ message: 'Sales order not found' });
        }

        res.status(200).json(updatedSalesOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a sales order by ID
export const deleteSalesOrderController = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSalesOrder = await SalesOrder.findByIdAndDelete(id);

        if (!deletedSalesOrder) {
            return res.status(404).json({ message: 'Sales order not found' });
        }

        res.status(200).json({ message: 'Sales order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fetch all active sales orders
export const getActiveSalesOrdersController = async (req, res) => {
    try {
      const activeSalesOrders = await SalesOrder.find({ status: 'active' })
        .populate('customer', 'name')
        .populate('products.product', 'name');
      res.status(200).json(activeSalesOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Fetch all complete sales orders
  export const getCompleteSalesOrdersController = async (req, res) => {
    try {
      const completeSalesOrders = await SalesOrder.find({ status: 'complete' })
        .populate('customer', 'name')
        .populate('products.product', 'name');
      res.status(200).json(completeSalesOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };