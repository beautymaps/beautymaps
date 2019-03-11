'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Set up mongoose connection
module.exports = () => {
    mongoose.connect('mongodb+srv://Simpcy:Just5673%2E@cluster0-tsbp2.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, () =>
        // eslint-disable-next-line no-console
        console.error.bind(console, 'MongoDB connection error:')
    );
};