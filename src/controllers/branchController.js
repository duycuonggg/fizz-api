import { StatusCodes } from 'http-status-codes'
import { branchService } from '~/services/branchService'

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)
    const createBranch = await branchService.createNew(req.body)
    res.status(StatusCodes.OK).json({ createBranch})
  } catch (error) { next(error) }
}

export const branchController = {
  createNew
}