import { Schema, model, Types } from 'mongoose'

interface Product{
    name: string
    description: string
    characteristics: string
    price: number
    categories: string[]
    pictures: string[]
}


export default model(
  'Product',
  new Schema<Product>({
    name: { type: String, unique: true, required: true },
    description: {type:String, required: true},
    characteristics: {type: String, required: false},
    price: {type: Number, required: true},
    categories: [{ type: Types.ObjectId, ref: "Category", required: true }],
    pictures:[{type: String, required:true, }]
    }, {
    versionKey: false,
    timestamps: true,
  })  
)
