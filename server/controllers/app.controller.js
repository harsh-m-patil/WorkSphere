import User from '../models/user.model.js'
import mongoose from 'mongoose'
import Work from '../models/work.model.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getAppInfo = asyncHandler(async (req, res, next) => {
  const [
    userStats,
    newUserStats,
    workStats,
    monthlyUserStats,
    monthlyWorkStats,
  ] = await Promise.all([
    // Total active users grouped by role
    User.aggregate([
      {
        $match: { active: true },
      },
      {
        $group: {
          _id: '$role',
          totalUsers: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]),

    // New users added in the past month grouped by role
    User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: { _id: '$role', newUsers: { $sum: 1 } },
      },
    ]),

    // Work stats for active jobs
    Work.aggregate([
      {
        $group: {
          _id: '$active',
          totalTasks: { $sum: 1 },
          totalPay: { $sum: '$pay' },
        },
      },
    ]),

    // Monthly user stats by role
    User.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          role: 1,
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
      },
      {
        $group: {
          _id: { month: '$month', year: '$year' },
          monthlyUsers: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 },
      },
    ]),

    // Monthly job stats (jobs completed per month)
    Work.aggregate([
      {
        $project: {
          active: 1,
          pay: 1,
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
      },
      {
        $group: {
          _id: { month: '$month', year: '$year' },
          totalJobs: { $sum: 1 },
          totalPay: { $sum: '$pay' },
        },
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 },
      },
    ]),
  ])

  // Merge monthlyUserStats and monthlyWorkStats by month and year
  const mergedMonthlyStats = monthlyUserStats.map((userStat) => {
    const workStat = monthlyWorkStats.find(
      (work) =>
        work._id.month === userStat._id.month &&
        work._id.year === userStat._id.year,
    )

    return {
      ...userStat,
      totalJobs: workStat ? workStat.totalJobs : 0, // If no work stats found, set to 0
      totalPay: workStat ? workStat.totalPay : 0, // If no work stats found, set to 0
    }
  })

  res.status(200).json({
    status: 'success',
    data: {
      userStats,
      newUserStats,
      workStats,
      monthlyUserStats,
      monthlyWorkStats: mergedMonthlyStats, // Send merged data
    },
  })
})

// Utility function to format model name
const formatModelName = (str) => {
  if (!str) return ''
  let formatted = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  if (formatted.endsWith('s')) {
    formatted = formatted.slice(0, -1) // Remove the last 's'
  }
  return formatted
}

export const downloadData = asyncHandler(async (req, res) => {
  const modelName = formatModelName(req.query.q) // Process model name
  const Model = mongoose.models[modelName] // Retrieve the Mongoose model

  if (!Model) {
    return res.status(400).json({ error: 'Invalid model name' })
  }

  const docs = await Model.find().lean() // Fetch data from the database

  const fileName = `${modelName.toLowerCase()}s.json` // Set file name

  res.header('Content-Type', 'application/json')
  res.header('Content-Disposition', `attachment; filename=${fileName}`)
  res.status(200).json(docs)
})
