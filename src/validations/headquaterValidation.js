import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validator'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().min(2).max(20).required().messages({
      'name.string.min': 'headquater name must be at least 2 characters long.',
      'name.string.max': 'headquater name cannot exceed 20 characters,',
      'name.any.required': 'headquater name is required.'
    }),
    email: Joi.string().email().required().messages({
      'email.string.email': 'Invalid email format.',
      'email.any.required': 'Email is required.'
    }),
    address: Joi.string().min(5).max(50).required().messages({
      'address.string.min': 'Address must be at least 5 characters long.',
      'address.string.max': 'Address cannot exceed 50 characters. ',
      'address.any.required': 'Address is required.'
    }),
    phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE)
  }) 
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const headquaterValidation = {
  createNew
}