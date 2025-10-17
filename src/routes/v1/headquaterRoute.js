import express from 'express'
import { headquaterController } from '~/controllers/headquaterController'
import { headquaterValidation } from '~/validations/headquaterValidation'

const Router = express.Router()
Router.route('/')
  .post(headquaterValidation.createNew, headquaterController.createNew)

export const headquaterRouter = Router