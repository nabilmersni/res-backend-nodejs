const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create service Schema & model
const ServiceSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    latitude: {
        type: String
    },
    longtitude: {
        type: String
    },
    address: {
        type: String
    },
    postalCode: {
        type: String
    },
    owner_Id: {
        type: String
    },
    secteur: {
        type: String
    },
    website: {
        type: String
    },
    facebbok_url: {
        type: String
    },
    instagram_url: {
        type: String
    },
    telephone: {
        type: String
    },
    nb_reservation: {
        type: String
    },
    description: {
        type: String 
    },
    photos: [],
    buisness_opens: [],
    booking_deadline: {
        type: String
    },
    booking_marjin_time: {
        type: String
    }
    //secteur (restauration, coiffure etc), 
    //site web, page facebook, num de téléphone, superficie, matricule fiscal
});

const Service = mongoose.model('service', ServiceSchema);

module.exports = Service;
