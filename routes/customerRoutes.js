import express from "express"
import { requireSignIn} from "../middlewear/authmiddlewear.js"
import { createCustomerController, deleteCustomerController, getAllCustomerController, getSingleCustomerController, updateCustomerController } from "../controllers/customerController.js"


const router = express.Router()

router.post('/create-customer', requireSignIn, createCustomerController)
router.get('/all-customer', getAllCustomerController)
router.get('/single-customer/:id', getSingleCustomerController)
router.put('/update-customer/:id', requireSignIn, updateCustomerController)
router.delete('/delete-customer/:id' , requireSignIn, deleteCustomerController)



export default router