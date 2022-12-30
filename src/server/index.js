
const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
// Start up an instance of app
const app = express()

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');
app.use(cors());

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('dist'))


console.log(`Your API Keys is ${process.env.API_KEY_GEONAMES}`);
console.log(`Your API Keys is ${process.env.API_KEY_PIXEL}`);
console.log(`Your API Keys is ${process.env.API_KEY_WEATHER}`);


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// api setup


app.post('/all', (req, res) => {
    console.log("im here in index.js ");
    const pApiKey = process.env.API_KEY_PIXEL
    const wApiKey = process.env.API_KEY_WEATHER;
    const gApiKey = process.env.API_KEY_GEONAMES
    let projectData = {};

    const dest = req.body.data
    // geonames  base url 
    const gAPI = (`http://api.geonames.org/searchJSON?name=${dest}&maxRows=1&username=naif`);

    //geonames fetching
    fetch(gAPI)
        .then(response => response.json())

        .then((gData) => {
            // console.log(gData)
            const lat = gData.geonames[0].lat;
            const lng = gData.geonames[0].lng;
            // Weatherbit base url 
            const wAPI = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=9ba01690f3414f84b05c1b1c57748d21`;

            // Weatherbit fetching
            fetch(wAPI)
                .then(res => res.json())
                .then(wData => {
                    //pixbay base url

                    const pAPI = `https://pixabay.com/api/?key=32416373-9154921b03dfa40c6fd99fc8f&q=${dest}&image_ty`;

                    //Pixabay fetching
                    fetch(pAPI)
                        .then(res => res.json())
                        .then(pData => {
                            projectData['countryCode'] = gData.geonames[0].countryCode
                            projectData['name'] = gData.geonames[0].name;
                            projectData['temp'] = wData.data[0].max_temp
                            projectData['daysuntil'] = req.body.days
                            projectData['imageUrl'] = pData.hits[0].userImageURL


                            // Sent All Data
                            res.send(projectData);
                        })
                })
        })
})

// designates what port the app will listen to for incoming requests
app.listen(8085, function () {
    console.log('Example app listening on port 8085!')
})