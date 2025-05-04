import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import User from '../models/user.model.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import Transaction from '../models/transaction.model.js'

const router = express.Router()

router.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) return res.status(500).send("Error creating order");

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

router.post("/order/validate", authMiddleware.protect, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const userId = req.user.id;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update user's pro status
    user.pro = true;
    user.proExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await user.save({ validateBeforeSave: false });

    // Save transaction
    await Transaction.create({
      user: user._id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: 500, // example: ₹499 x 100 paise, change if dynamic
    });

    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating user subscription" });
  }
});

export default router
