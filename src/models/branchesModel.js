import { GET_DB } from '~/config/mongodb'
import { PHONE_RULE, PHONE_RULE_MESSAGE ,OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
import { ObjectId } from 'mongodb'
import Joi from 'joi'

const BRANCH_COLLECTION_NAME = 'branch'
const BRANCH_COLLECTION_SCHEMA = Joi.object({
  headquaterId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  code: Joi.string().min(3).max(10).required(),
  name: Joi.string().min(2).max(20).required(),
  address: Joi.string().min(5).max(50).required(),
  phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const validateBeforeCreate = async (data) => {
  return await BRANCH_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)
    const newBranchToAdd = {
      ...valiData,
      headquaterId: new ObjectId(valiData.headquaterId)
    }
    return await GET_DB().collection(BRANCH_COLLECTION_NAME).insertOne(newBranchToAdd)
  } catch (error) {
    throw new Error(error)
  }
}

export const branchModel = {
  createNew
}