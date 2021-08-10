const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Prestataire = require('./../models/prestataire');

const app = express();

//GET ALL
app.get('/', async(req, res) => {

    try {
        const prestataires = await Prestataire.find()
        res.status(200).send(prestataires)
    } catch (error) {
        res.status(400).send(error)
    }

});

// GET BY ID
app.get('/:id', async(req, res) => {

    try {
        const prestataire = await Prestataire.findOne({ _id: req.params.id })
        if (!prestataire) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send(prestataire)
        }
    } catch (error) {
        res.status(400).send(error)
    }

});


//DELETE
app.delete('/:id', async(req, res) => {

    try {
        const prestataire = await Prestataire.findOneAndDelete({ _id: req.params.id })
        if (!prestataire) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send({ msg: "DELETED" })
        }
    } catch (error) {
        res.status(400).send(error)
    }

});

//POST add new perstataire
app.post('/', async(req, res) => {
    try {
        let data = req.body;

        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(data.password, salt);

        const prestataire = new Prestataire({
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            website: data.website,
            facebook_url: data.facebook_url,
            instagram_url: data.instagram_url,
            latitude: data.latitude,
            longtitude: data.longtitude,
            type: data.type,
            patented: data.patented,
            NRE: data.NRE,
            businessName: data.businessName

        })

        await prestataire.save()
        res.status(201).send({ msg: "SAVED" })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)

    }
})

app.post('/login', async(req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let prestataire = await Prestataire.findOne({ email });

        if (!prestataire) {
            res.status(404).send({ msg: "email incorrect" })
        } else {
            let compare = bcrypt.compareSync(password, prestataire.password);

            if (!compare) {
                res.status(404).send({ msg: "password incorrect" })
            } else {

                if (!prestataire.is_active) {
                    res.status(400).send({ msg: "connot login" })
                } else {
                    let token = jwt.sign({ role: "prestataire",prestataire: prestataire }, "SECRITOU");
                    res.status(200).send({ token })
                }

            }
        }

    } catch (error) {
        res.status(400).send(error)
    }

})

//PUT
app.put('/:id', async(req, res) => {

    try {
        let prestataire = await Prestataire.findOneAndUpdate({ _id: req.params.id }, req.body)

        if (!prestataire) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send({ msg: "UPDATED" })
        }

    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = app