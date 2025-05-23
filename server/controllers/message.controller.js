import Message from '../models/message.model.js'

import { getReceiverSocketId, io } from '../utils/socket.js'

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const myId = req.user._id

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })

    res.status(200).json({
      status: 'success',
      data: {
        messages,
      },
    })
  } catch (error) {
    console.log('Error in getMessages controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
    })

    await newMessage.save()

    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
