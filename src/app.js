const express = require('express');
const cors = require('cors');
require('dotenv').config();

module.exports = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors());
    app.use(express.static('public'));
    app.use(express.static('tmp/uploads'));
    require('./database/index');
    require('./routes')(app);
    app.set('port', process.env.PORT);
    return app;
}