import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema(
  {
    clientSubscription: {
      type: Number,
      default: 50000, // NOTE: in paise
    },
    freelancerSubcription: {
      type: Number,
      default: 10000,
    },
  },
  { timestamps: true },
)

const Setting = mongoose.model('Setting', settingSchema)

export default Setting
