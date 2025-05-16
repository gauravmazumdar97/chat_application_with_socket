const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            required: true
        },
        messageDelivered: {
            type: String,
            required: true,
            default: 'Not Yet'
        },
        messageSeen: {
            type: String,
            required: true,
            default: 'Unread'
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;