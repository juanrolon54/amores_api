import { Schema, model, Types } from 'mongoose'
import bcrypt from 'bcrypt'

interface User{
    name: string
    email: string
    password: string
    permits: string[]
}

interface UserMethods {
    comparePassword(password:string): Promise<boolean>
}

const schema = new Schema<User, {}, UserMethods>({
    name: { type: String, unique: true, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    permits: [{ type: Types.ObjectId, ref: "Permit"}]
    }, {
    versionKey: false,
    timestamps: true,
})  
  
schema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

schema.method<User>('comparePassword', async function comparePassword(password: string):Promise<boolean> {
    return await bcrypt.compare(password, this.password)
})


export default model(
    'User',
    schema
)