import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  VStack,
  Divider,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Flex,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import SalesOrderForm from "./SalesOrderform"
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext is correctly implemented

const Dashboard = () => {
  const [activeSalesOrders, setActiveSalesOrders] = useState([]);
  const [completeSalesOrders, setCompleteSalesOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [auth, setAuth] = useAuth(); // Using AuthContext

  // Function to fetch Active Sales Orders from backend
  const fetchActiveSalesOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/salesorder/active-sales-orders');
      setActiveSalesOrders(data);
      console.log('Active Sales Orders:', data);
    } catch (error) {
      console.error('Error fetching active sales orders:', error);
    }
  };

  // Function to fetch Complete Sales Orders from backend
  const fetchCompleteSalesOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/salesorder/complete-sales-orders');
      setCompleteSalesOrders(data);
      console.log('Complete Sales Orders:', data);
    } catch (error) {
      console.error('Error fetching complete sales orders:', error);
    }
  };

  // Function to fetch all products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/all-product'); // Adjust the endpoint as necessary
      setProducts(data);
      console.log('Products:', data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchActiveSalesOrders();
    fetchCompleteSalesOrders();
    fetchProducts();
  }, []);

  // Function to handle opening the modal for editing or creating sales orders
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
    onClose();
  };

  // Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle logout
  const handleLogout = () => {
    setAuth({
      user: null,
      token: ''
    });
    localStorage.removeItem('auth'); // Remove stored authentication data
    // Redirect to login page
    // Example redirect using react-router-dom
    // replace '/login' with your actual login route
    window.location.replace('/login');
  };

  // Responsive email and logout button layout
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container mt={8}>
      <Flex direction={isMobile ? 'column' : 'row'} align="center" justify="space-between" mb={4}>
        {auth.user && (
          <Text mb={isMobile ? 2 : 0} fontWeight="bold" textAlign={isMobile ? 'center' : 'left'}>
            {`Logged in as: ${auth.user.email}`}
          </Text>
        )}
        <Spacer />
        <Button colorScheme="red" onClick={handleLogout} mb={isMobile ? 4 : 0}>
          Logout
        </Button>
      </Flex>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>Active Sales Orders</Tab>
          <Tab>Complete Sales Orders</Tab>
          <Tab>All Products</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Price</Th>
                  <Th>Order Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeSalesOrders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order.orderNumber}</Td>
                    <Td>{order.totalAmount}</Td>
                    <Td whiteSpace="nowrap">
                      {new Date(order.orderDate).toLocaleString()}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleOpenModal(order)}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button mt={4} colorScheme="teal" onClick={() => handleOpenModal(null)}>
              + Sale Order
            </Button>
          </TabPanel>
          <TabPanel>
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Price</Th>
                  <Th>Order Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completeSalesOrders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order.orderNumber}</Td>
                    <Td>{order.totalAmount}</Td>
                    <Td whiteSpace="nowrap">
                      {new Date(order.orderDate).toLocaleString()}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Input
              placeholder="Search products..."
              mb={4}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Box>
              {filteredProducts.map((product) => (
                <Box key={product._id} mb={4} p={4} borderWidth="1px" borderRadius="md">
                  <Text><strong>ID:</strong> {product.display_id}</Text>
                  <Text><strong>Name:</strong> {product.name}</Text>
                  <Text><strong>Category:</strong> {product.category}</Text>
                  <Text><strong>Characteristics:</strong> {product.characteristics}</Text>
                  <Text><strong>Features:</strong> {product.features}</Text>
                  <Text><strong>Brand:</strong> {product.brand}</Text>
                  {product.sku.map((sku, index) => (
                    <Box key={index} mt={2} p={2} border="1px" borderColor="gray.200" borderRadius="md">
                      <VStack align="start" spacing={1}>
                        <Text><strong>Selling Price:</strong> {sku.selling_price}</Text>
                        <Text><strong>Max Retail Price:</strong> {sku.max_retail_price}</Text>
                        <Text><strong>Amount:</strong> {sku.amount}</Text>
                        <Text><strong>Unit:</strong> {sku.unit}</Text>
                        <Text><strong>Quantity:</strong> {sku.quantity_in_inventory}</Text>
                      </VStack>
                      {index < product.sku.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal for creating/editing sales orders */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedOrder ? 'Edit Sales Order' : 'Create Sales Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SalesOrderForm
              selectedOrder={selectedOrder}
              fetchActiveSalesOrders={fetchActiveSalesOrders}
              onCloseModal={handleCloseModal}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Dashboard;
