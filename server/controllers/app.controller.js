import User from '../models/user.model.js'
import Work from '../models/work.model.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getAppInfo = asyncHandler(async (req, res, next) => {
  const [userStats, newUserStats, workStats] = await Promise.all([
    User.aggregate([
      {
        // match only active users
        $match: { active: true },
      },
      {
        // Group them by role
        $group: {
          _id: '$role',
          totalUsers: { $sum: 1 },
        },
      },
      {
        // Sort by role to make the output more readable (optional)
        $sort: { _id: 1 },
      },
    ]),
    User.aggregate([
      {
        $match: {
          // New users added in past month
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      // Group by role
      { $group: { _id: '$role', newUsers: { $sum: 1 } } },
    ]),
    Work.aggregate([
      {
        $group: {
          _id: '$active',
          totalTasks: { $sum: 1 },
          totalPay: { $sum: '$pay' },
        },
      },
    ]),
  ])

  res.status(200).json({
    status: 'success',
    data: {
      userStats,
      newUserStats,
      workStats,
    },
  })
})
