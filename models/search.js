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
            language: 11
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

}

module.exports = Search;