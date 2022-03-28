const { showMenu, pause, readInputCity, showPlaces } = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async() => {
    
    let optSelected;
    const search = new Search();

    do {

        optSelected = await showMenu();

        switch (optSelected) {
            case 1:
                // ASK FOR A PLACE/CITY
                const input = await readInputCity();

                // CALL API TO GET THE RESULTS
                const cities = await search.geoLocations(input);
                
                // SHOW PLACES TO SELECT ONE OF THEM
                const cityId = await showPlaces(cities);

                if( cityId === 0 ) continue;

                const { name, longitude, latitude, shortName } = cities.find( city => city.id === cityId );

                // CALL WEATHER API TO GET THE CITY'S WEATHER
                const { temp, min, max, desc } = await search.weatherForecast(longitude, latitude);
               
                // RESPONSE (geolocation + weather)
                console.clear();
                console.log(`Information of the city: `.green);
                console.log('City: ', name);
                console.log('Latitude: ', latitude);
                console.log('Longitude: ', longitude);
                console.log('Temperature: ', temp);
                console.log('Min: ', min);
                console.log('Max: ', max);
                console.log('Weather: ', desc);

                search.addRecord(shortName);

                break;
            case 2:
                if( search.getRecords.length === 0 ) console.log('There is not records to show yet.'.red);
                search.getRecords.forEach( (record, index) => {
                    const i = index + 1;
                    console.log(`${ i }. `.green + record);
                });
                break;
        }

        if ( optSelected != 3 ) await pause();

    } while ( optSelected != 3)
}


main();