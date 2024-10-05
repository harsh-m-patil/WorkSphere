import Work from '../models/work.model.js'
import AppError from '../utils/appError.js'
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
  setId: (req, res, next) => {
    req.body.client_id = req.user._id
    next()
  },

  /**
   * @description Gives the all the works available
   */
  getWorks: factory.getAll(Work),

  /**
   * @description Deactivate the some work by putting workId
   *
   */
  deactivateWork: asyncHandler(async (req, res, next) => {
    const work = await Work.findByIdAndUpdate(
      req.body.workId,
      {
        active: false,
      },
      { new: true },
    )

    if (!work) {
      return next(new AppError(`No Work with that id found`, 404))
    }
    next()
  }),

  /**
   * @desciption Assign Work to Freelancer by putting workId,clientId & freelancerId
   * in req.body
   *
   */

  assignWork: asyncHandler(async (req, res, next) => {
    const work = await Work.findByIdAndUpdate(
      req.body.workId,
      {
        freelancer_id: req.body.freelancerId,
      },
      { new: true },
    )

    if (!work) {
      return next(new AppError(`No Work with that id found`, 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        work,
      },
    })
  }),

  /**
   * @description Apply to the Work by getting WorkId && freelancerId
   */
  applyWork: asyncHandler(async (req, res, next) => {
    const work = await Work.findById(req.body.workId)

    if (!work) {
      return next(new AppError(`No work with that id found`, 404))
    }
    work.applied_status.push(req.body.userId)
    await work.save()

    res.status(200).json({
      status: 'success',
      data: {
        work,
      },
    })
  }),

  /**
   * @description Gives all works created by specific client by taking client id
   */
  getmyWorks: asyncHandler(async (req, res, next) => {
    const works = await Work.find({ client_id: req.body.clientId })

    res.status(200).json({
      status: 'success',
      data: {
        works,
      },
    })
  }),

  /**
   * @desciption Gives all the users list who have applied for particular work
   */

  getUsersForWork: asyncHandler(async (req, res, next) => {
    const workdetails = await Work.findById(req.body.workId).populate(
      'applied_status',
    )

    if (!workdetails) {
      return next(new AppError(`No user for this work found`, 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        workdetails,
      },
    })
  }),
}

export default workController
