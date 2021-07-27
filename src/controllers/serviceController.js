const express = require('express')
const bcrypt = require('bcryptjs');
var fs = require('fs');
const app = express();

const multer = require('multer');
const Service = require('./../models/service');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

var uploads = multer({ storage })
//GET
app.get('/', async (req, res) => {

    try {
        const service = await Service.find()
        res.status(200).send(service)
    } catch (error) {
        res.status(400).send(error)
    }

});

//POST
// Ajouter un service
app.post('/', uploads.array('photos'), async (req, res) => {
    try {

        var paths = req.files.map(file => file.path);

        let data = JSON.parse(req.body.service);
        //console.log(data.photos[0])
        const service = new Service({
            name: data.name,
            type: data.type,
            latitude: data.latitude,
            longtitude: data.longtitude,
            address: data.address,
            postalCode: data.postalCode,
            owner_Id: data.owner_Id,
            secteur: data.secteur,
            website: data.website,
            facebbok_url: data.facebbok_url,
            instagram_url: data.instagram_url,
            telephone: data.telephone,
            nb_reservation: data.nb_reservation,
            description: data.description,
            photos: paths,
            buisness_opens: data.buisness_opens,
            booking_deadline: data.booking_deadline,
            booking_marjin_time: data.booking_marjin_time
        })

       // console.log(req.files[0].path)
       /* req.files.map(f =>{
            let i = 0;
            service.photos.url='hello';
            i++;
            console.log(f.path)
            
        }
            );*/
       // service.photos= req.body.photos

        await service.save()
        res.status(201).send({ msg: "SAVED" })
        //console.log(res)


       

    }
    catch (error) {
        console.log(`uploads.array error: ${error}`);
        res.status(400).send(error)
        console.log(error)

    }
})

//DELETE

app.delete("/:id", async (req, res) => {
    try {
        Service.findOneAndRemove
        {
            _id: req.params.id
        }
        res.status(202).send({ msg: "DELETED" })



    }
    catch (error) {
        res.status(400).send(error)
    }
})


module.exports = app