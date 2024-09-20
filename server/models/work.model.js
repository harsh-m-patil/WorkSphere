import mongoose from 'mongoose'
import User from './user.model.js'

const workSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        pay: {
            type: Number,
            required: true,
        },
        joblevel: {
            type: String,
            enum: {
                values: ['Easy','Medium','Hard'],
                message: '{VALUE} is invalid',
            },
            default: 'Medium',
        },
        skills_Required: {
            type: [String],
            required: true,
        },
        applied_status: {
            type: [String]
        },
        active: {
            type: boolean,
            default: true,
        },
        client_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        freelancer_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    }   
)

const Work = mongoose.model('Work', workSchema)

export default Work
