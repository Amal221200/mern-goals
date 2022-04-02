const mongoose = require('mongoose');

const GoalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: [true, 'Please add a text'],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', GoalSchema)