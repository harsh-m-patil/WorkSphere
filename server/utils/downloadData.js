import asyncHandler from './asyncHandler.js'

class Download {
  static downloadData() {
    return asyncHandler(async (req, res, next) => {
      try {
        const Model = req.query.q
        const docs = await Model.find().lean() // Fetch data from the database
        const modelName = `${Model.modelName.toLowerCase()}s`

        res.header('Content-Type', 'application/json')
        res.header(
          'Content-Disposition',
          `attachment; filename=${modelName}.json`,
        )
        res.status(200).json(docs)
      } catch (error) {
        next(error) // Pass errors to the error-handling middleware
      }
    })
  }
}

export default Download
