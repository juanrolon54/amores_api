import { Router } from 'express'
import data from './data'
import auth from './auth'

const router = Router()

router.use('/data', data)
router.use('/auth', auth)

export default router