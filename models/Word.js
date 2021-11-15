const { Schema, model } = require('mongoose')

const WordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    word: {
        type: String,
        required: true
    },
    translation: {
        type: String,
        required: true
    },
    transcription: {
        type: String
    },
    examples: [
        { type: String }
    ]
})

module.exports = Word = model('word', WordSchema)
