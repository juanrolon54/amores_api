import { Router } from 'express'
import { safetyWrapper } from '../../middlewares'
import signup from './signup'
import login from './login'

const router = Router()

router.post('/login', safetyWrapper(login,'login'))
router.post('/signup', )

export default router