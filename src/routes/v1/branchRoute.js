import express from 'express'
import { branchValidation } from '~/validations/branchValidation'
import { branchController } from '~/controllers/branchController'

const Router = express.Router()
Router.route('/')
  .post(branchValidation.createNew, branchController.createNew)

export const branchRouter = Router