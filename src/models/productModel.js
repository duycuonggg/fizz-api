import { GET_DB } from '~/config/mongodb.js'

const PRODUCT_COLLECTION_NAME = 'product'

const createNew = async (data) => {
  try {
    return await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(data)
  } catch (error) { throw new Error(error) }
}

export const productModel = {
  createNew
}