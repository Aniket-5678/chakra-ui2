// routes/salesOrderRoutes.js

import express from 'express';
import { createSalesOrderController, deleteSalesOrderController, getActiveSalesOrdersController, getAllSalesOrdersController, getCompleteSalesOrdersController, getSingleSalesOrderController, updateSalesOrderController } from '../controllers/salesController.js';
import {requireSignIn} from "../middlewear/authmiddlewear.js"


const router = express.Router();

router.post('/create-sales-order', requireSignIn, createSalesOrderController);
router.get('/all-sales-orders',  getAllSalesOrdersController);
router.get('/single-sales-order/:id',  getSingleSalesOrderController);
router.put('/update-sales-order/:id', updateSalesOrderController);
router.delete('/delete-sales-order/:id',  deleteSalesOrderController);

// Get active sales orders
router.get('/active-sales-orders', getActiveSalesOrdersController);

// Get complete sales orders
router.get('/complete-sales-orders', getCompleteSalesOrdersController);

export default router;
