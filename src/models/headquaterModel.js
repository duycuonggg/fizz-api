import { GET_DB } from '~/config/mongodb'
import Joi from 'joi'
import { PHONE_RULE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'

const HEADQUATER_COLLECTION_NAME = 'headquater'
const HEADQUATER_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(5).max(50).required(),
  phone: Joi.string().pattern(PHONE_RULE),
  // manager: Joi.string().parttern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const validateBeforeCreate = async (data) => {
  return await HEADQUATER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    return await GET_DB().collection(HEADQUATER_COLLECTION_NAME).insertOne(await validateBeforeCreate(data))
  } catch (error) {
    throw new Error(error)
  }
}

export const headquaterModel = {
  createNew
}