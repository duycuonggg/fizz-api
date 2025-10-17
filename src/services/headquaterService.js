import { headquaterModel } from '~/models/headquaterModel'

const createNew = async (data) => {
  try {
    const newHeadquater = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,  
      // manager: data.manager,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await headquaterModel.createNew(newHeadquater)
  } catch (error) { throw error }
}

export const headquaterService = {
  createNew
}