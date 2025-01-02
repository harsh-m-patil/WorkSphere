import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import workController from '../controllers/work.controller.js'

const router = express.Router()

/**
 * @openapi
 * /api/v1/work/{id}:
 *   get:
 *     tags:
 *       - Work
 *     summary: Get work by ID
 *     description: Retrieve details of a specific work by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Work ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work details retrieved successfully.
 */
router.get('/:id', workController.getWork)

/**
 * @openapi
 * /api/v1/work/{id}:
 *   delete:
 *     tags:
 *       - Work
 *     summary: Delete work by ID (Admin only)
 *     description: Delete a specific work by its ID. Only admins can perform this operation.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Work ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Work deleted successfully.
 */
router.delete(
  '/:id',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  workController.deleteWork,
)

/**
 * @openapi
 * /api/v1/work/cancel/{id}:
 *   delete:
 *     tags:
 *       - Work
 *     summary: Cancel application (Freelancer only)
 *     description: Allow a freelancer to cancel their application for a specific work.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Work ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Application canceled successfully.
 */
router.delete(
  '/cancel/:id',
  authMiddleware.protect,
  authMiddleware.restrictTo('freelancer'),
  workController.cancelApplication,
)

/**
 * @openapi
 * /api/v1/work:
 *   post:
 *     tags:
 *       - Work
 *     summary: Create a new work (Client only)
 *     description: Allow a client to post a new work.
 *     requestBody:
 *       description: Work details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Work created successfully.
 */
router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.restrictTo('client'),
  workController.setId,
  workController.createWork,
)

/**
 * @openapi
 * /api/v1/work:
 *   get:
 *     tags:
 *       - Work
 *     summary: Get all works
 *     description: Retrieve a list of all works posted.
 *     responses:
 *       200:
 *         description: List of works retrieved successfully.
 */
router.get('/', workController.getWorks)

/**
 * @openapi
 * /api/v1/work/assign:
 *   post:
 *     tags:
 *       - Work
 *     summary: Assign work to a user (Client only)
 *     description: Allow a client to assign a work to a specific freelancer.
 *     requestBody:
 *       description: Work assignment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Work assigned successfully.
 */
router.post(
  '/assign',
  authMiddleware.protect,
  authMiddleware.restrictTo('client'),
  workController.deactivateWork,
  workController.assignWork,
)

/**
 * @openapi
 * /api/v1/work/apply:
 *   post:
 *     tags:
 *       - Work
 *     summary: Apply for work (Freelancer only)
 *     description: Allow a freelancer to apply for a specific work.
 *     requestBody:
 *       description: Work application details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Application submitted successfully.
 */
router.post(
  '/apply',
  authMiddleware.protect,
  authMiddleware.restrictTo('freelancer'),
  workController.applyWork,
)

/**
 * @openapi
 * /api/v1/work/myworks:
 *   post:
 *     tags:
 *       - Work
 *     summary: Get client's works
 *     description: Allow a client to fetch a list of their posted works.
 *     responses:
 *       200:
 *         description: List of works retrieved successfully.
 */
router.post('/myworks', workController.getmyWorks)

/**
 * @openapi
 * /api/v1/work/getUsersForWork:
 *   post:
 *     tags:
 *       - Work
 *     summary: Get users who applied for a specific work
 *     description: Allow a client to retrieve a list of users who applied for a specific work.
 *     requestBody:
 *       description: Work ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workId:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 */
router.post('/getUsersForWork', workController.getUsersForWork)

export default router
