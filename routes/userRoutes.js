import express from "express"
import { loginController, registerController, testController } from "../controllers/userController.js"
import { isAdmin, requireSignIn} from "../middlewear/authmiddlewear.js"



const router = express.Router()

router.post('/register',  registerController)

router.post('/login', loginController)

//test routes
router.get('/test', requireSignIn, isAdmin,  testController)

//protected user auth Routes
router.get('/user-auth', requireSignIn, (req, res)=> {
  res.status(200).send({ok: true})
})

//protected admin auth Routes
router.get('/admin-auth', requireSignIn, isAdmin, (req, res)=> {
  res.status(200).send({ok: true})
})


export default router