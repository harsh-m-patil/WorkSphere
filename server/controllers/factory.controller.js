import APIFeatures from '../utils/apiFeatures.js'
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
      const { search } = req.query

      const searchCondtions = search ? { $text: { $search: search } } : {}
      let query = Model.find(searchCondtions)

      //// Apply advanced filters, field selection, and sorting
      const features = new APIFeatures(query, req.query)
        .filter()
        .limitFields()
        .sort()

      // Use the filtered query to get the total count
      const total = await Model.countDocuments(features.query.getFilter())

      // Apply pagination
      // eslint-disable-next-line prefer-destructuring
      query = features.paginate().query

      // Execute the final query
      const docs = await query

      res.status(200).json({
        status: 'success',
        results: docs.length,
        total,
        data: docs,
      })
    }),
}

export default factory
