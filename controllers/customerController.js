import customerModel from "../models/customer.model.js";


// create Customer controller

export const createCustomerController= async (req, res) => {
    const customerData = req.body;
    const customer = new customerModel(customerData);
    try {
      const newCustomer = await customer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


//all customer controller

  export const getAllCustomerController = async (req, res) => {
    try {
      const customers = await customerModel.find(); // Fetch all customers from the database
  
      res.status(200).json(customers); // Send the customers as JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  //singleCustomer controller


  export const  getSingleCustomerController = async (req, res) => {
    const { id } = req.params; // Destructure id directly from req.params
  
    try {
      const customer = await customerModel.findById(id); // Query customer by id
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json(customer); // Send the customer as JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //update customer controller

  export const updateCustomerController = async (req, res) => {
    const { id } = req.params; // Retrieve customer ID from route params
    const customerData = req.body; // New customer data to update
  
    try {
      // Find the customer by _id and update with customerData
      const updatedCustomer = await customerModel.findByIdAndUpdate(id, customerData, {
        new: true, // Return the updated customer rather than the original one
      });
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json(updatedCustomer); // Send the updated customer as JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  export const deleteCustomerController = async (req, res) => {
    const { id } = req.params; // Retrieve customer ID from route params
    try {
        const deletedCustomer = await customerModel.findByIdAndDelete(id);
        
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
