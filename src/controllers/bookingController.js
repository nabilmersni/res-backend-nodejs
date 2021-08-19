const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Booking = require('./../models/booking');
const Service = require('./../models/service');


const app = express();

app.get('/', async (req, res) => {

    try {
        const booking = await Booking.find()
        res.status(200).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }

});

//POST add new booking
app.post('/', async (req, res) => {
    try {
        let data = req.body;


        const booking = new Booking({
            day: data.day,
            time: data.time,
            Service_Id: data.Service_Id,
            Client_Id: data.Client_Id


        })

        console.log(booking);
        await booking.save()
        res.status(201).send({ msg: "SAVED" })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)

    }
})


// get booking By Prestataire
app.get('/:id', async (req, res) => {
    try {
        const service = await Service.find({ owner_Id: req.params.id });
        bookings = [];


        if (!service) {
            res.send(404).send({ msg: "SERVICE NOT FOUND" })
        }
        else {

            const booking = await Booking.find();
            if (!booking) {
                res.send(404).send({ msg: "BOOKING NOT FOUND" })

            }
            else {
               /* bookings = booking.filter(el => {
                    service.find(element => {
                        element._id == el.Service_Id;
                    });
                });*/

                for(var arr in service){
                    for(var filter in booking){
                        if(service[arr]._id == booking[filter].Service_Id){
                           bookings.push(booking[filter]);
                          }
                    }
                 }
                //console.log(bookings);

                res.status(200).send(bookings);

            };
        };


    }
    catch (error) {
        res.status(400).send(error);
        console.log(error);
    }

});

// update reservation

app.put('/:id', async(req,res)=>{
    try {
        let booking = await Booking.findOneAndUpdate({ _id: req.params.id }, req.body)

        if (!booking) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send({ msg: "UPDATED" })
        }

    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = app