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

                const { id, name, longitude, latitude } = cities.find( city => city.id === cityId );

                // CALL WEATHER API TO GET THE CITY'S WEATHER
                const { temp, min, max, desc } = await search.weatherForecast(longitude, latitude);
               
                // RESPONSE (geolocation + weather)
                console.log(`Information of the city: `.green);
                console.log('City: ', name);
                console.log('Latitude: ', latitude);
                console.log('Longitude: ', longitude);
                console.log('Temperature: ', temp);
                console.log('Min: ', min);
                console.log('Max: ', max);
                console.log('Weather: ', desc);
                break;
        
            case 2: 

                break;
        }

        if ( optSelected != 3 ) await pause();

    } while ( optSelected != 3)
}


main();