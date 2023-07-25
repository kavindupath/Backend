const HttpError= require('../models/http-error');
const axios = require('axios'); //axios can be used to call from a server to another server. 
//Here we are trying to call Google geo code API server from our Node backend

const API_KEY="";

async function getCordinateForAddress(address)
{
    // return dummy cordinates for now
    return {
        lat:49.4545,
        lng:-45.544
    }

    /*const response=axios.get('request string from Google should paste here along with the address and the API KEY as the parameters');
    const data= response.data;

    if(!data || data.status=== "ZERO_RESULTS")
    {
        const error= new HttpError("Could not find the geo locations for the given address", 404);
        throw error;
    }
    const cordinates = data.results[0].geometry.location;
    return cordinates;*/
}

module.exports=getCordinateForAddress;