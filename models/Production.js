const mongoose = require('mongoose')
const { Schema } = mongoose

// changed _id to flavorId

const productionSchema = new Schema({
    productionDate: Date,
    mlProduced: Number,
    comment: String,
})

module.exports = productionSchema