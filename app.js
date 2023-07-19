const express = require ("express");
const bodyParser= require("body-parser");


const placesRoutes= require('./routes/places-routes');

const app= express();

//now this acts as express middleware
app.use('/api/places',placesRoutes);

//error handling middleware of express
//This functin will execute if any function in the middleware have an error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    // Check if response has been already sent
    return next(error);
  }
    res
      .status(error.code || 500)
      .json({ message: "An unexpected error ocured" || error.message });
  
});


app.listen(5000);