const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
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
        minLength: 7
    },
    role: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
        
    },
    is_active: {
        type: Boolean,
        default: true
    },

})

const User = mongoose.model('users', userSchema)

module.exports = User;