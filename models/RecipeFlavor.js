const mongoose = require('mongoose')
const { Schema } = mongoose

// changed _id to flavorId

const recipeFlavorSchema = new Schema({
    nameBrand: String,
    flavorId: String,
    name: String,
    brand: String,
    iconUrl: String,
    vg: Number,
    pg: Number,
    perc: Number,
    ml: Number
})

module.exports = recipeFlavorSchema