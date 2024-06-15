import  express from "express"

import { requireSignIn} from "../middlewear/authmiddlewear.js"
import { createProductController, getAllProductController,  updateProductController,deleteProductController,  getSingleProductController} from "../controllers/productController.js"

const router = express.Router()

router.post('/create-product',requireSignIn, createProductController)

router.get('/all-product', getAllProductController)

router.get('/single-product/:id', getSingleProductController )

router.post('/update-product/:id', requireSignIn,  updateProductController)

router.delete('/delete-product/:id',requireSignIn,  deleteProductController)

export default router