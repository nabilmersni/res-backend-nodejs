const mongoose = require('mongoose')
const validator = require('validator')

const prestataireSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: false
    },

})

const Prestataire = mongoose.model('prestataires', prestataireSchema)

module.exports = Prestataire;