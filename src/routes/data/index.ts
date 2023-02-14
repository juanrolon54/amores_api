import { Router } from "express";
import products from './products'
import { safetyWrapper } from "../../middlewares";

const router = Router()

router.use('/products',safetyWrapper(products, 'products'))

export default router