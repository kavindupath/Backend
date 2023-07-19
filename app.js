const express = require ("express");
const bodyParser= require("body-parser");

//now this acts as express middleware
const placesRoutes= require('./routes/places-routes');

const app= express();

app.use(placesRoutes);

app.listen(5000);