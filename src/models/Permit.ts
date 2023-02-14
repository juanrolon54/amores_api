import { Schema, model, Types } from 'mongoose'

interface Permit {
    name:string
}

export default model(
  'Permit',
    new Schema<Permit>({
    name: { type: String, unique: true, required:true },
  }, {
      versionKey:false, timestamps:false
  })
)
