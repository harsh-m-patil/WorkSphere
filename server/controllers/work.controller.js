import Work from '../models/work.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import factory from './factory.controller.js'

const workController = {
  /**
   * @description Create new Work post
   */
  createWork: factory.createOne(Work),

  /**
   * @description Gives Client Id in Req_Body
   */
  setId: (req,res,next) => {
    req.body.client_id = req.user._id
    next()
  },

  /**
   * @description Gives the all the works available
   */
  getWorks: factory.getAll(Work),


  /**
   * @description Deactivate the some work by putting workId,clientId & freelancerId
   * 
   */
  deactivateWork: asyncHandler( async (req,res,next)=>{
      const work = await Work.findByIdAndUpdate(req.body.workId, {
        active:false 
      })

      if(!work){
        return next(new AppError(`No Work with that id found`, 404))
      }
      next()

  }),

  /**
   * @desciption Assign Work to Freelancer by putting workId,clientId & freelancerId
   * in req.body
   *   
   */
  assignWork : asyncHandler( async (req,res,next)=>{
      const work = await Work.findByIdAndUpdate(req.body.workId,{
        freelancer_id: req.body.freelancerId
      })

      if(!work){
        return next(new AppError(`No Work with that id found`, 404))
      }
      
      res.status(200).json({
        status: 'success',
        data: {
          work,
        },
      })
  })



}

export default workController
