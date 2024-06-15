import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast"
import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
} from '@chakra-ui/react';

const SalesOrderForm = ({ selectedOrder, fetchActiveSalesOrders, onCloseModal }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [customer, setCustomer] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (selectedOrder) {
      setOrderNumber(selectedOrder.orderNumber || '');
      setCustomer(selectedOrder.customer || '');
      setTotalAmount(selectedOrder.totalAmount || '');
      setStatus(selectedOrder.status || 'active');
    } else {
      setOrderNumber('');
      setCustomer('');
      setTotalAmount('');
      setStatus('active');
    }
  }, [selectedOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salesOrderData = {
      orderNumber,
      customer,
      totalAmount,
      status,
    };

    try {
      if (selectedOrder) {
        await axios.put(`/api/v1/salesorder/update-sales-order/${selectedOrder._id}`, salesOrderData);
         toast.success("update successfully")
      } else {
        await axios.post('/api/v1/salesorder/create-sales-order', salesOrderData);
        toast.success("sales Order Created successfully")
      }
      fetchActiveSalesOrders();
      onCloseModal();
    } catch (error) {
      console.error('Error saving sales order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Order Number</FormLabel>
        <Input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Customer ID</FormLabel>
        <Input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Total Amount</FormLabel>
        <Input
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          required
          type="number"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="complete">Complete</option>
        </Select>
      </FormControl>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} type="submit">
          Save
        </Button>
        <Button onClick={onCloseModal}>Cancel</Button>
      </ModalFooter>
    </form>
  );
};

export default SalesOrderForm;
