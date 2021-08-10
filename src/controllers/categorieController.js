const express = require('express')
const bcrypt = require('bcryptjs');
const Categorie = require('./../models/categories');


const app = express();

//GET
app.get('/', async(req,res)=>{
    try {
        const categorie = await Categorie.find()
        res.status(200).send(categorie);
    } catch (error) {
        res.status(400).send(error);
    }

})

//POST

app.post('/',async(req,res)=>{
    try{
        let name = req.body.name;
        const categorie= new Categorie({
            name:name
        });

        await categorie.save();
        res.status(201).send({ msg: "SAVED" })



    }
    catch(error){
        res.status(400).send(error);
    }
})


// GET 
app.get('/:id',async (req,res)=>{

    try {
        const categorie = await Categorie.findOne({ _id: req.params.id })
        if (!categorie) {
            res.status(404).send({ msg: "NOT FOUND" })
        } else {
            res.status(200).send(categorie.name)
        }
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = app;