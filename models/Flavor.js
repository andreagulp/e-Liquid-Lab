const mongoose = require('mongoose')
const { Schema } = mongoose

const flavorSchema = new Schema({
    brand: String,
    name: String,
    iconUrl: String,
    qty: Number,
    rating: Number,
    baseVg: Number,
    basePg: Number,
    comment: String,
    storageLocation: String,
    expirationDate: Date,
    minQtyAlert: Number,
    expirationDateAlertActive: Boolean,
    minQtyAlertActive: Boolean,
    alertList: Boolean,
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    creationDate: Date,
    lastUsedDate: Date
})

mongoose.model('flavors', flavorSchema)
