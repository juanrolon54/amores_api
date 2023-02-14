import express from 'express'
import cors from 'cors'
import routes from './routes'
import { mongooseConnect } from './models'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

mongooseConnect()

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))


