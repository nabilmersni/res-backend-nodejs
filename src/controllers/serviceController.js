const express = require('express')
const bcrypt = require('bcryptjs');
var fs = require('fs');
const app = express();


const multer = require('multer');
const Service = require('./../models/service');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/servicephoto')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})

var uploads = multer({ storage })
//GET
app.get('/', async (req, res) => {

    try {
        const service = await Service.find()
        res.status(200).send(service);
    } catch (error) {
        res.status(400).send(error);
    }

});

//GET By ID
app.get('/:id', async (req, res) => {

    try {
        let id = req.params.id;
        const service = await Service.findById(id);
        res.status(200).send(service);
    } catch (error) {
        res.status(400).send(error);

    }

});


// GET BY OWNER
app.get('/getByPrestataire/:owner_Id', async (req, res) => {

    try {
        const service = await Service.find({ owner_Id: req.params.owner_Id })
        if (!service) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send(service)
        }
    } catch (error) {
        res.status(400).send(error)
    }

});


//POST
// Ajouter un service
app.post('/', uploads.array('photos'), async (req, res) => {
    try {

        var paths = req.files.map(file => "http://localhost:3000/" + file.filename);
        //var imgs = paths.forEach(path=> +path);


        let data = JSON.parse(req.body.service);
       console.log(JSON.parse(req.body.service));
        const service = new Service({
            name: data.name,
            type: data.type,
            address: data.address,
            postalCode: data.postalCode,
            owner_Id: data.owner_Id,
            telephone: data.telephone,
            nb_reservation: data.nb_reservation,
            description: data.description,
            photos: paths,
            buisness_opens: data.buisness_opens,
            booking_deadline: data.booking_deadline,
            booking_marjin_time_start: data.booking_marjin_time_start,
            booking_marjin_time_end: data.booking_marjin_time_end
        })

        await service.save()
        res.status(201).send({ msg: "SAVED" })
        //console.log(res)




    }
    catch (error) {
        console.log(` ${error}`);
        res.status(400).send(error)
        console.log(error)

    }
})

//DELETE

app.delete("/:id", async (req, res) => {
    try {
        const service = await Service.findOneAndDelete({ _id: req.params.id })
        if (!service) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send({ msg: "DELETED" })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

// PUT
app.put("/:id",uploads.array('photos'), async (req, res) => {

        
        

    var paths = req.files.map(file => "http://localhost:3000/" + file.filename);
    


    let data = JSON.parse(req.body.service);
        var newService = {
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
            booking_marjin_time_start: data.booking_marjin_time_start,
            booking_marjin_time_end: data.booking_marjin_time_end
        }

        const service = await Service.findByIdAndUpdate({ _id: req.params.id }, { $set: newService }, { new: true }, (err, doc) => {
            if (!err) { res.status(200).send(doc); }
            else {
                res.status(400).send(console.log("erreur de mise a jour" + err));
            }
            })
    })


    //SEARCH BY category

    app.get('/category/:id', async(req,res)=>{

        try {
            const service = await Service.find({ type: req.params.id })
            if (!service) {
                res.status(404).send({ msg: "NOT FOUND" })
            } else {
                
                res.status(200).send(service);


            }
        } catch (error) {
            res.status(400).send(error)
        }  

    })

    


module.exports = app