import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'

const createNew = async (req, res, next) => {
  try {
    const createProduct = await productService.createNew(req.body)
    res.status(StatusCodes.OK).json({ createProduct })
  } catch (error) { next(error) }
}

export const productController = {
  createNew
}