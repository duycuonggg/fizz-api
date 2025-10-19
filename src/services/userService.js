import { userModel } from '~/models/userModel'

const createNew = async (data) => {
  try {
    const newUser = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await userModel.createNew(newUser)
  } catch (error) { throw error }
}

export const userService = {
  createNew
}