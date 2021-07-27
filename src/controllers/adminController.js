const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin')

const app = express()

//POST
app.post('/', async(req, res) => {
    let data = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(data.password, salt);

    try {
        const admin = new Admin({
            email: data.email,
            password: hashedPassword
        })
        let savedAdmin = await admin.save()
        res.status(201).send(savedAdmin)
    } catch (error) {
        res.status(400).send(error)
    }
})

//GET
app.get('/', async(req, res) => {

    try {
        const admin = await Admin.find()
        res.status(200).send(admin)
    } catch (error) {
        res.status(400).send(error)
    }

});

app.post('/login', async(req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let admin = await Admin.findOne({ email });

        if (!admin) {
            res.status(404).send({ "message": "email incorrect" })
        } else {
            let compare = bcrypt.compareSync(password, admin.password);

            if (!compare) {
                res.status(404).send({ "message": "password incorrect" })
            } else {
                let token = jwt.sign({ role: "admin" }, "SECRITOU");
                res.status(200).send({ token })
            }
        }

    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = app