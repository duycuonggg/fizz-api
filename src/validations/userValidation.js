import ApiError from '~/utils/ApiError'
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be an empty field',
      'string.min': 'Name should have a minimum length of {#limit}',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email cannot be an empty field',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password should have a minimum length of {#limit}',
      'string.empty': 'Password cannot be an empty field',
    }),
    role: Joi.string().valid('manager', 'employee').default('employee').messages({
      'any.only': 'Role must be either manager or employee'
    }),
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const userValidation = {
  createNew
}