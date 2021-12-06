const express = require('express');
const cors = require('cors');
require('dotenv').config();

module.exports = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.set('port', process.env.PORT);
    return app;
}