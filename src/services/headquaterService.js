import { headquaterModel } from '~/models/headquaterModel'

const createNew = async (data) => {
  try {
    const newHeadquater = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await headquaterModel.createNew(newHeadquater)
  } catch (error) { throw error }
}

export const headquaterService = {
  createNew
}