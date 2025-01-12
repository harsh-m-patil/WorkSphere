import Work from '../models/work.model.js'
import User from '../models/user.model.js'
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'
import factory from './factory.controller.js'

const workController = {
  /**
   * @description Create new Work post
   */
  createWork: factory.createOne(Work),
  getWork: factory.getOne(Work),
  deleteWork: factory.deleteOne(Work),
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

    await User.findByIdAndUpdate(req.body.freelancerId, {
      $inc: { balance: work.pay },
    })

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
    const { workId } = req.body
    const userId = req.user.id

    // Find the work and ensure it exists
    const work = await Work.findById(workId)
    if (!work) {
      return next(new AppError(`No work with that ID found`, 404))
    }

    // Check if the user has already applied
    if (work.applied_status.includes(userId)) {
      return next(new AppError(`User has already applied for this work`, 400))
    }

    // Update user's application count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { noOfApplications: 1 },
    })

    // Add user to applied_status and save work
    work.applied_status.push(userId)
    work.noOfApplicants = work.noOfApplicants + 1
    await work.save()

    res.status(200).json({
      status: 'success',
      message: 'Application Accepted',
      data: {
        work,
      },
    })
  }),

  cancelApplication: asyncHandler(async (req, res, next) => {
    const workId = req.params.id
    const userId = req.user.id

    // Find the work and ensure it exists
    const work = await Work.findById(workId)
    if (!work) {
      return next(new AppError(`No work with that ID found`, 404))
    }

    // Check if the user has not applied
    if (!work.applied_status.includes(userId)) {
      return next(new AppError(`User has not applied for this work`, 400))
    }

    // Update user's application count
    await User.findByIdAndUpdate(userId, {
      $inc: { noOfApplications: -1 },
    })

    // Remove user from applied_status and save work
    work.applied_status = work.applied_status.filter(
      (id) => id.toString() !== userId,
    )
    await work.save()

    res.status(200).json({
      status: 'success',
      message: 'Application Cancelled',
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
