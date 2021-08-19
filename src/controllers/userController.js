const express = require('express')
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const Prestataire = require('./../models/prestataire');
var fs = require('fs');
const multer = require('multer');

const jwt = require('jsonwebtoken');


const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/userPhoto')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})

var uploads = multer({ storage })


//GET ALL
app.get('/', async (req, res) => {

    try {
        const user = await User.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }

});

// GET BY ID
app.get('/:id', async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(400).send(error)
    }

});



//POST add new user
app.post('/', async (req, res) => {
    try {
        let data = req.body;

        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(data.password, salt);

        const user = new User({
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,


        })

        await user.save()
        res.status(201).send({ msg: "SAVED" })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)

    }
})


app.post('/login', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await User.findOne({ email });

        if (!user) {
            //res.status(404).send({ msg: "email incorrect" })
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
                        let token = jwt.sign({ role: "prestataire", prestataire: prestataire }, "SECRITOU");
                        res.status(200).send({ token })
                    }

                }
            }

        } else {
            let compare = bcrypt.compareSync(password, user.password);

            if (!compare) {
                res.status(404).send({ msg: "password incorrect" })
            } else {

                if (!user.is_active) {
                    res.status(400).send({ msg: "connot login" })
                } else {
                    let token = jwt.sign({ role: "user", user: user }, "SECRITOU");
                    res.status(200).send({ token })
                }

            }
        }

    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }

})



// PUT
app.put("/:id", uploads.single('photos'), async (req, res) => {

    let data = JSON.parse(req.body.user);


    var newuser = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,

    }

    if (req.file) {
        var paths = "http://localhost:3000/" + req.file.filename;
        newuser.image = paths
    }

    if (data.password) {
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(data.password, salt);
        newuser.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: newuser }, { new: true }, (err, doc) => {
        if (!err) { res.status(200).send(doc); }
        else {
            res.status(400).send(console.log("erreur de mise a jour" + err));
        }
    })
})






module.exports = app;