const mongoose = require('mongoose')
const validator = require('validator')

const CategorieSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }


    })

const Categorie = mongoose.model('categories', CategorieSchema)

module.exports = Categorie;