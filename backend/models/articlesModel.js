const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    content: {
        type: String,
        required: [false, "Please add content"],
        trim: true
    },
    image: {
        type: String,
        required: [false]
    },
    private: {
        type: Boolean,
        required: false,
        default: 1
    }
}, {timestamps: true})

module.exports = mongoose.model('Articles', articlesSchema)