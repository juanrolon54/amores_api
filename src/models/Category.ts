import { Schema, model, Types } from 'mongoose'

interface Category {
    name:string
}

export default model(
  'Category',
    new Schema<Category>({
    name: { type: String, unique: true, required:true },
  }, {
      versionKey:false, timestamps:false
  })
)
