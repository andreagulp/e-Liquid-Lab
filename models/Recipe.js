const mongoose = require('mongoose')
const { Schema } = mongoose
const recipeFlavorSchema = require('./RecipeFlavor')
const productionSchema = require('./Production')

const recipeSchema = new Schema({
    mlToProduce: Number,
    baseVg: Number,
    basePg: Number,
    nicoVg: Number,
    nicoPg: Number,
    nicoStrength: Number,
    desiredNicoStrength: Number,
    rating: Number,
    name: String,
    comment: String,
    recipeFlavors: [recipeFlavorSchema],
    production: [productionSchema],
    isPubblic: Boolean,
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    creationDate: Date,
    isForked: String,
    recipeForkedId: String,
    recipeForkedName: String,
    updateDate: Date
})

mongoose.model('recipes', recipeSchema)