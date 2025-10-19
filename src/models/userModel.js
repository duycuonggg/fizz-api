import { GET_DB } from '~/config/mongodb'
import Joi from 'joi'

const USER_COLLECTION_NAME = 'user'
const USER_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('manager', 'employee').default('employee'),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)
    const newUserToAdd = {
      ...valiData
    }
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(newUserToAdd)
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  createNew
}