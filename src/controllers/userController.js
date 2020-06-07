const express = require('express')
const bcrypt = require('bcryptjs');

const mongoose = require('../db/connection');

const User = require('./../models/user');

const auth = require('../middleware/auth');

const router = express();

//GET
router.get('/prestataire/all', function (req, res, next) {
    User.find({ role: "prestataire" }).then(function (users) {
        res.send(users);
    });
});

//POST
router.post('/', async (req, res) => {
    let data = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(data.password, salt);

    try {
        const user = new User({
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            role: data.role,
            password: hashedPassword
        })

        if (user.role != "user") {
            user.is_active = false
        }

        let savedUser = await user.save()
        res.status(201).send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})
/*
router.get('/', function (req, res, next) {
    User.find({}).then(function (users) {
        res.send(users);
    });
});

router.get("/:id", (req, res, next) => {
    console.log('get by id');

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        User.findOne({ _id: req.params.id }).then(function (user) {

            if (user) {
                console.log('succes');
                res.send(user);
            } else {
                res.send(404);
                console.log('no data exist for this id');
            }
        });
    }
    else {
        console.log('Please provide correct id');
        res.send(404);
        //res.sendStatus(status);
    }
});

router.get('/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})


router.post('/login', async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/me/logoutall', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/activate/:id', function (req, res, next) {
    console.log('put mehtod');
    //User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    // User.findOne({_id: req.params.id}).then(function(user){
    //     user.is_active=true;
    //     res.send(user);
    // });
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        User.findOne({ _id: req.params.id }).then(function (user) {
            // if(err) {
            //   //res.reject(err);
            //   console.log('err');
            //   //res.sendStatus(status);
            // } else 
            if (user) {
                //res.resolve({success:true,data:doc});
                console.log('succes');
                User.update({ _id: req.params.id }, { is_active: true })
                res.send(user);
            } else {
                res.send(404);
                console.log('no data exist for this id');
            }
        });
    }
    else {
        console.log('Please provide correct id');
        res.send(404);
        //res.sendStatus(status);
    }
    //}).catch(next);
});
*/
module.exports = router