import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'name.string.min': 'Product name must be at least 2 characters long.',
      'name.string.max': 'Product name cannot exceed 100 characters.',
      'name.any.required': 'Product name is required.',
      'name.string.empty': 'Product name cannot be empty.',
      'name.string.base': 'Product name must be a string.'
    }),
    price: Joi.number().positive().precision(2).required().messages({
      'price.number.positive': 'Price must be a positive number (greater than 0).',
      'price.number.precision': 'Price can only have a maximum of 2 decimal places.',
      'price.any.required': 'Product price is required.',
      'price.number.base': 'Price must be a valid number.'
    }),
    category: Joi.string().min(2).max(50).required().messages({
      'category.string.min': 'Category must be at least 2 characters long.',
      'category.string.max': 'Category cannot exceed 50 characters.',
      'category.any.required': 'Product category is required.',
      'category.string.empty': 'Category cannot be empty.',
      'category.string.base': 'Category must be a string.'
    }),
    quantity: Joi.number().integer().min(0).required().messages({
      'quantity.number.integer': 'Quantity must be a whole number (integer).',
      'quantity.number.min': 'Quantity cannot be less than 0.',
      'quantity.any.required': 'Product quantity is required.',
      'quantity.number.base': 'Quantity must be a valid number.'
    }),
    image: Joi.string().uri().required().messages({
      'image.string.uri': 'The image path must be a valid URL (link).',
      'image.any.required': 'Image path is required.',
      'image.string.empty': 'Image path cannot be empty.',
      'image.string.base': 'Image path must be a string.'
    }),
    description: Joi.string().allow('').max(500).messages({
      'description.string.max': 'Description cannot exceed 500 characters.',
      'description.string.base': 'Description must be a string.'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const productValidation = {
  createNew
}