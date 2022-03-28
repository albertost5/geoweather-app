require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
class Search {
    
    #records = [];
    dbFilePath = process.env.DB_PATH + '/' + process.env.FILENAME_DB;

    constructor() {
        this.readDb();
    }

    get paramsMapboxGET() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: process.env.LANGUAGE_RESPONSE
        }
    }

    get getRecords() {
        return this.#records;
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
                shortName: city.text,
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

    addRecord( placeName = '' ) {
        if( this.#records.length == 5 ) {
            this.#records.unshift(placeName);
            this.#records.pop();
        } else {
            this.#records.unshift(placeName);
        }
        // Add the records array to the JSON file.
        this.addRecordsDb();
    }

    readDb() {
        
        if( !fs.existsSync( process.env.DB_PATH ) ){
            fs.mkdirSync(process.env.DB_PATH);
            fs.appendFileSync( this.dbFilePath , '' );
        } else {
            try {
                // JSON content
                const content = fs.readFileSync( this.dbFilePath , { encoding: 'utf-8' } );
                JSON.parse(content).records.forEach( city => {
                    this.#records.push(city);
                });
                
            } catch (error) {
                console.log('There was an error reading the json file.'.red);
            }
            
        }
    }

    addRecordsDb() {
        try { 
            fs.writeFileSync( this.dbFilePath, JSON.stringify({
                records:  this.#records
            }));
        } catch (error) {
            console.log('There was an error wrting the json file.'.red);
        }
    }

    
}

module.exports = Search;