import { productModel } from '~/models/productModel'

const createNew = async (data) => {
  try {
    const newProduct = {
      name: data.name,
      price: data.price,
      category: data.category,
      quantity: data.quantity,
      image: data.image,
      description: data.description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await productModel.createNew(newProduct)
  } catch (error) { throw error }
}

export const productService = {
  createNew
}