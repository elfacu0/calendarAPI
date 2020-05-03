const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
require('dotenv/config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const homeRoute = require('./routes/Home');
app.use(cors());
app.use('/', homeRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connecting');
    console.log(mongoose.connection.readyState);
    console.log(
        mongoose.connection.readyState === 1
            ? 'CONNECTION SUCCESSFUL'
            : 'ERROR IN CONNECTION'
    );
});

app.listen(port);
console.log('App is listening on port ' + port);
