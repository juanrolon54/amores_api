import mongoose, { connect } from "mongoose";
import 'dotenv/config'

export function mongooseConnect() {
    mongoose.set('strictQuery', true)
    return mongoose.connect(String(process.env.DB_URI))
}

export {default as Permit} from './Permit'
export {default as Product} from './Product'
export { default as User } from './User'
export {default as Category} from './Category'