const express = require ("express");
const bodyParser= require("body-parser");


const placesRoutes= require('./routes/places-routes');
const usersRoutes =require('./routes/users-route');

const app= express();

//parse any incoming request body and extract any json data which is in there
app.use(bodyParser.json());

//now this acts as express middleware
app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoutes);

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