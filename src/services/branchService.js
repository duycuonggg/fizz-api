import { branchModel } from '~/models/branchesModel'

const createNew = async (data) => {
  try {
    const newBranch = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await branchModel.createNew(newBranch)
  } catch (error) { throw error }
}

export const branchService = {
  createNew
}