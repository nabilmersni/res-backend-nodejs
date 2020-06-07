const mongoose = require('mongoose')
const validator = require('validator')

const AdminSchema = mongoose.Schema({

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
})

const Admin = mongoose.model('admin', AdminSchema)

module.exports = Admin