import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRouter } from '~/routes/v1/productRoute'
import { headquaterRouter } from '~/routes/v1/headquaterRoute'
import { branchRouter } from '~/routes/v1/branchRoute'
const Router = express.Router()
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs_V1 are ready to use' })
})

Router.use('/product', productRouter)
Router.use('/headquater', headquaterRouter)
Router.use('/branch', branchRouter)

export const APIs_V1 = Router