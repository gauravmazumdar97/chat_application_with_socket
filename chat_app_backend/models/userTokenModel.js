const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: '1h', // Token expires in 1 hour
        },
    },
    { timestamps: true }
);