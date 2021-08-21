const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'service must have a name'],
    trim: true,
  },

  type: {
    type: String,
    required: [true, 'service must have a type'],
  },

  latitude: {
    type: String,
  },

  longtitude: {
    type: String,
  },

  address: {
    type: String,
  },

  postalCode: {
    type: String,
  },

  owner_Id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'service must have an owner'],
  },

  secteur: {
    type: String,
  },

  website: {
    type: String,
  },

  facebbok_url: {
    type: String,
  },

  instagram_url: {
    type: String,
  },

  telephone: {
    type: String,
    // required: [true, 'service must have a phone number'],
  },

  nb_reservation: {
    type: String,
  },

  description: {
    type: String,
  },

  photos: [
    {
      url: {
        type: String,
      },
    },
  ],

  buisness_opens: [
    {
      day: {
        type: String,
      },
    },
  ],
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
