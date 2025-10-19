import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { PHONE_RULE, PHONE_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    headquaterId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    code: Joi.string().min(3).max(10).required().messages({
      'code.string.min': 'Branch code must be at least 3 characters long.',
      'code.string.max': 'Branch code cannot exceed 10 characters.',
      'code.any.required': 'Branch code is required.'
    }),
    name: Joi.string().min(2).max(20).required().messages({
      'name.string.min': 'headquater name must be at least 2 characters long.',
      'name.string.max': 'headquater name cannot exceed 20 characters,',
      'name.any.required': 'headquater name is required.'
    }),
    address: Joi.string().min(5).max(50).required().messages({
      'address.string.min': 'Address must be at least 5 characters long.',
      'address.string.max': 'Address cannot exceed 50 characters. ',
      'address.any.required': 'Address is required.'
    }),
    phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE)
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false})
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const branchValidation = {
  createNew
}