require('dotenv').config();
const axios = require('axios');
class Search {

    records = [];

    constructor() {

    }

    get paramsMapboxGET(){
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: process.env.LANGUAGE_RESPONSE
        }
    }

    async geoLocations( place = '' ) {
        let response; 
        // HTTP request to geocodingAPI
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapboxGET,
                timeout: 1000
            });

            response = await instance.get();
            
            return response.data.features.map(city => ({
                id: city.id,
                name: city.place_name,
                longitude: city.center[0],
                latitude: city.center[1]
            }));

        } catch (error) {
            // return error;
            return [];
        }
    }

    async weatherForecast( long = '', lat = '' ) {
        let response;
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    lat: lat,
                    lon: long,
                    appid: process.env.OPENWEATER_KEY,
                    lang: process.env.LANGUAGE_RESPONSE,
                    units: 'metric'
                },
                timeout: 1000
            });

            response = await instance.get();

            return {
                temp: response.data.main.temp,
                min: response.data.main.temp_min,
                max: response.data.main.temp_max,
                desc: response.data.weather[0].description
            }

        } catch (error) {
            return [];
        }
    }
}

module.exports = Search;