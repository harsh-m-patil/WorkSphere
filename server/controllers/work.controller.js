import Work from '../models/work.model.js'
import factory from './factory.controller.js'

const workController = {
  /**
   * @description Create new Work post
   */
  createWork: factory.createOne(Work),

  setId: (req,res,next) => {
    req.body.client_id = req.user._id
    next()
  }
}

export default workController
