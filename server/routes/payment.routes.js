import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import User from '../models/user.model.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import Transaction from '../models/transaction.model.js'
import Setting from '../models/setting.model.js'

const router = express.Router()

/**
 * @openapi
 * /api/v1/payment/order:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Create a new Razorpay order
 *     description: Creates a new payment order using Razorpay for client subscription
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Razorpay order ID
 *                   example: order_JdkeLqKnJL7kJx
 *                 entity:
 *                   type: string
 *                   example: order
 *                 amount:
 *                   type: integer
 *                   description: Amount in smallest currency unit (paise for INR)
 *                   example: 50000
 *                 amount_paid:
 *                   type: integer
 *                   example: 0
 *                 amount_due:
 *                   type: integer
 *                   example: 50000
 *                 currency:
 *                   type: string
 *                   example: INR
 *                 receipt:
 *                   type: string
 *                   example: receipt_order_1683456789
 *                 status:
 *                   type: string
 *                   example: created
 *                 created_at:
 *                   type: integer
 *                   example: 1683456789
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Error creating Razorpay order or Internal Server Error
 */
router.post('/order', authMiddleware.protect, async (req, res) => {
  try {
    const setting = await Setting.findOne()
    const amount = setting?.clientSubscription ?? 50000
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    })
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1,
    }
    const order = await razorpay.orders.create(options)
    if (!order) return res.status(500).send('Error creating Razorpay order')
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

/**
 * @openapi
 * /api/v1/payment/order/validate:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Validate Razorpay payment
 *     description: Validates a completed Razorpay payment and updates user subscription status
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 description: Razorpay order ID
 *                 example: order_JdkeLqKnJL7kJx
 *               razorpay_payment_id:
 *                 type: string
 *                 description: Razorpay payment ID
 *                 example: pay_JdkfMkbnsa87K
 *               razorpay_signature:
 *                 type: string
 *                 description: Razorpay signature for verification
 *                 example: 9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d
 *     responses:
 *       200:
 *         description: Payment verified successfully and subscription updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Payment verified and subscription updated successfully
 *                 orderId:
 *                   type: string
 *                   example: order_JdkeLqKnJL7kJx
 *                 paymentId:
 *                   type: string
 *                   example: pay_JdkfMkbnsa87K
 *       400:
 *         description: Invalid payment signature
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Transaction is not legit!
 *       401:
 *         description: Unauthorized - User not authenticated
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error during payment validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Server error during payment validation
 */
router.post('/order/validate', authMiddleware.protect, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body
  const userId = req.user.id
  try {
    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = sha.digest('hex')
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: 'Transaction is not legit!' })
    }
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ msg: 'User not found' })
    user.pro = true
    user.proExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    await user.save({ validateBeforeSave: false })
    const setting = await Setting.findOne()
    const amount = setting?.clientSubscription ?? 50000
    // Save transaction
    await Transaction.create({
      user: user._id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      status: 'success',
    })
    res.json({
      msg: 'Payment verified and subscription updated successfully',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error during payment validation' })
  }
})

export default router
