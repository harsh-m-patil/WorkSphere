import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import AppError from '../utils/appError.js'
import {
  interviewQuestionSystemPrompt,
  skillMatchSystemPrompt,
} from '../utils/ai.js'

const aiRouter = new Router()

aiRouter.post(
  '/skill-match',
  authMiddleware.protect,
  authMiddleware.restrictTo('freelancer'),
  authMiddleware.requirePro,
  async (req, res, next) => {
    if (!req.body.description) {
      return next(new AppError('Empty Job description'))
    }

    const { user } = req
    const userInfo = JSON.stringify({
      userName: user.userName,
      description: user.description,
      skills: user.skills,
      certificates: user.certificates,
      works: user.works,
    })

    const jd = JSON.stringify({
      desc: req.body.description,
      skills: req.body.skills,
    })

    const markdown = await skillMatchSystemPrompt(
      JSON.stringify({
        userInfo,
        job_description: jd,
      }),
    )

    return res.json({
      data: {
        markdown,
      },
    })
  },
)

aiRouter.post(
  '/interview',
  authMiddleware.protect,
  authMiddleware.restrictTo('freelancer'),
  authMiddleware.requirePro,
  async (req, res, next) => {
    if (!req.body.description) {
      return next(new AppError('Empty Job description'))
    }

    const { user } = req
    const userInfo = JSON.stringify({
      userName: user.userName,
      description: user.description,
      skills: user.skills,
      certificates: user.certificates,
      works: user.works,
    })

    const jd = JSON.stringify({
      desc: req.body.description,
      skills: req.body.skills,
    })

    const markdown = await interviewQuestionSystemPrompt(
      JSON.stringify({
        userInfo,
        job_description: jd,
      }),
    )

    return res.json({
      data: {
        markdown,
      },
    })
  },
)

export default aiRouter
