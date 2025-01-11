import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'

const factory = {
  /**
   * @param {mongoose.Model} Model
   * @returns {Function} delete Handler Function
   * @description Delete a document of a given Model by ID
   */
  deleteOne: (Model) =>
    asyncHandler(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id)

      const modelName = Model.modelName.toLowerCase()
      if (!doc) {
        return next(new AppError(`No ${modelName} with that id found`, 404))
      }

      res.status(204).json({
        status: 'success',
        data: null,
      })
    }),

  /**
   * @param {mongoose.Model} Model
   * @returns {Function} update Handler Function
   * @description Update a document of a given Model by ID
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
        status: 'success',
        data: {
          [modelName]: doc,
        },
      })
    }),

  /**
   * @param {mongoose.Model} Model
   * @returns {Function} Get Handler Function
   * @description Get a document of a given Model by ID
   */
  getOne: (Model) =>
    asyncHandler(async (req, res, next) => {
      const doc = await Model.findById(req.params.id)

      const modelName = Model.modelName.toLowerCase()
      if (!doc) {
        return next(new AppError(`${modelName} not found`, 404))
      }

      res.status(200).json({
        status: 'success',
        data: {
          [modelName]: doc,
        },
      })
    }),

  /**
   * @param {mongoose.Model} Model
   * @returns {Function} Post Handler Function
   * @description Create a new document of a given Model
   */
  createOne: (Model) =>
    asyncHandler(async (req, res, next) => {
      const doc = await Model.create(req.body)

      const modelName = Model.modelName.toLowerCase()

      res.status(201).json({
        status: 'success',
        data: {
          [modelName]: doc,
        },
      })
    }),

  /**
   * @param {mongoose.Model} Model
   * @returns {Function} get All Docs Handler Function
   * @description get all documents of a given Model with pagination and optional search
   */
  getAll: (Model) =>
    asyncHandler(async (req, res, next) => {
      const { search, page = 1, limit = 10 } = req.query

      // Build the search condition using text index (optional)
      const searchCondition = search ? { $text: { $search: search } } : {}

      // Get total count
      const total = await Model.countDocuments(searchCondition)

      // Apply pagination
      const skip = (page - 1) * limit
      const docs = await Model.find(searchCondition)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }) // Example sort by latest created

      res.status(200).json({
        status: 'success',
        results: docs.length,
        total,
        data: docs,
      })
    }),
}

export default factory
