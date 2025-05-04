import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: Number,
    status: {
      type: String,
      enum: ['success', 'failed', 'refunded'],
      default: 'success',
    },
  },
  { timestamps: true },
)

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
