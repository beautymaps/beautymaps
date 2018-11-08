const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');
const mongoose = require('mongoose');
const config = require('../../config.js');
const jwt = require('jsonwebtoken');

let uri = config.MONGO_URI || 'mongodb://localhost:27017/bmaps';

mongoose.connect(uri);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log('we are connected to our database ')

    let productSchema = mongoose.Schema({
        name: String,
        price:String,
        brand: String,
        description:String,
        keywords: String,
        image: String, 
        long: Number,
        lat: Number,
        date: String
    });

    let userSchema = mongoose.Schema({
        uid: String,
        displayName: String,
        photoURL: String,
        email: String,
        phoneNumber: Number,
        providerId: String
    })
    
    // Store song documents in a collection called "songs"
    let Product = mongoose.model('products', productSchema);
    let User = mongoose.model('users', userSchema);
    // Error handling
    const sendError = (err, res) => {
        response.status = 501;
        response.message = typeof err == 'object' ? err.message : err;
        res.status(501).json(response);
    };
    
    // Response handling
    let response = {
        status: 200,
        data: [],
        message: null
    };
      
    router.get('/', (req, res)=> {
        res.send({carine: 'her man'})
    });
    router.post('/', (req, res)=> {
            console.log(req.body)
    });

    router.get('/get-all-products', (req, res) => {
        Product.find({}, (err, products) => {
            if(err) res.json(err)
            // console.log('here is a list of all the products', products)
            res.json(products);
        })
    });
// Addproduct

    router.post('/add-product', (req, res) => {
        let newProduct = new Product (req.body)

        newProduct.save((err) =>{
            if (err) return handleError(err);

            Product.find({ name: req.body.name })
                .sort('date')
                .exec((err, product)=> {
                    // console.log('we found products', product)
                    res.json(product);
                })
        })
    });

    router.post('/login-user', (req, res) => {
        console.log('this is req.body', req.body);
        User.findOne({uid: req.body.uid}, (err, registeredUser) => {
            console.log('this is find',err, registeredUser);
            let userData = req.body;
            let payload;
            if(err) console.log('there was an err', err)
            if(!registeredUser) {
                let user = new User(userData);
                user.save((err, newUser) => {
                    if(err) {
                        res.send('error saving new user');
                    } else {
                        payload = {subject: newUser.uid}
                        let token = jwt.sign(payload, 'secretKey')
                        console.log('we have a new user')
                        res.status(200).send({token:token, user:newUser});
                    }
                })
            } else {
                payload = {subject: registeredUser.uid}
                let token = jwt.sign(payload, 'secretKey') 
                console.log('we found a registered user')               
                res.status(200).send(registeredUser);
            }
        })
    })
})

module.exports = router;