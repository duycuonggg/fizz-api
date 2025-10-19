import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    const createUser = await userService.createNew(req.body)
    res.status(StatusCodes.OK).json({ createUser })
  } catch (error) { next(error) }
}

export const userController = {
  createNew
}