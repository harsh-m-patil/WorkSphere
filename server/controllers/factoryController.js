import AppError from "../utils/appError.js"
import asyncHandler from "../utils/asyncHandler.js"

const factory = {
  /**
   * @param {mongoose.Model} Model
   * @returns {Function} delete Handler Function
   * @description Delete a document of a given Model by ID
   * @example
   * const {deleteOne} = require('../controllers/factoryController')
   * const User = require('../models/userModel')
   *
   * exports.deleteUser = deleteOne(User)
   */
  deleteOne: (Model) =>
    asyncHandler(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id)

      const modelName = Model.modelName.toLowerCase()
      if (!doc) {
        return next(new AppError(`No ${modelName} with that id found`, 404))
      }

      res.status(204).json({
        status: "success",
        data: null,
      })
    }),

  /**
   * @param {mongoose.Model} Model
   * @returns {Function} update Handler Function
   * @description Update a document of a given Model by ID
   * @example
   * const {UpdateOne} = require('../controllers/factoryController')
   * const User = require('../models/userModel')
   *
   * exports.updateUser = updateOne(User)
   */
  updateOne: (Model) =>
    asyncHandler(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      const modelName = Model.modelName.toLowerCase()
      if (!doc) {
        return next(new AppError(`No ${modelName} with that id found`, 404))
      }

      res.status(200).json({
        status: "success",
        data: {
          [modelName]: doc,
        },
      })
    }),
}

export default factory
