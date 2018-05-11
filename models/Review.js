const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewsSchema = new Schema({
    recipeId: String,
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    creationDate: Date,
    text: String,
})

mongoose.model('reviews', reviewsSchema)