import { Request, Response, Router } from 'express'
import { Category, Product } from '../../models'

const router = Router()

router.get('/categories', async function (req, res) {
  const categories = await Category.find()
  res.status(200).json(categories)
})

router.get('/', [], async function (req: Request, res: Response) {
  const { sort, page, amount, ...productFilter } = req.body

  const products = await Product.find({ ...productFilter })
    .skip((amount || 0) * (page || 1))
    .limit(amount)
    .sort(sort)
    .populate('Category')

  res.status(200).json(products)
})

router.get('/:id', [], async function (req: Request, res: Response) {
  const product = await Product.findOne({ _id: req.params.id }).populate(
    'Category'
  )
  res.status(200).json(product)
})

router.post('/:id', [], async function (req: Request, res: Response) {
  const { categories, ...rest } = req.body

  const newProduct = new Product(rest)
  if (categories.length > 0) {
    const foundCategories = await Category.find({ name: { $in: categories } })
    newProduct.categories = foundCategories.map((category) =>
      String(category._id)
    )
  }

  await newProduct.save()

  res.status(201).json(newProduct)
})

router.put('/:id', [], async function (req: Request, res: Response) {
  const updatedItem = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  )
  res.status(200).json(updatedItem)
})

router.delete('/:id', [], async function (req: Request, res: Response) {
  await Product.deleteOne({ _id: req.params.id })
  res.status(204)
})

export default router
