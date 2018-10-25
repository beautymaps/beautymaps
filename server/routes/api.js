const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/bmaps', { useNewUrlParser: true }, (err, db) => {
        if (err) return console.log(err);

        closure(db.db('users'));
    });
};

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
        res.send({carine: 'hey'})
    });
// Get users
    router.get('/users', (req, res) => {
        connection((db) => {
            db.collection('users').findOne({
                EmployeeName: "NewEmployee"
            }, (err, result) => {
                if(err) {
                    res.send({err})
                } else {
                    res.send(result);
                }
            })
        });
    });

module.exports = router;