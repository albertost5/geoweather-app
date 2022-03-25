const { showMenu, pause, readInputCity } = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async() => {
    
    let optSelected;
    const search = new Search();
    do {

        optSelected = await showMenu();

        switch (optSelected) {
            case 1:
                // ASK FOR A PLACE/CITY
                const city = await readInputCity();
                console.log({ city });
                // CALL API TO GET THE RESULTS
                const cities = await search.geoLocations(city);
                console.log({ cities });

                // show the cities to select one of them
                // call the endpoint to get the weather of the city selected
                // RESPONSE with all the info of the city (weather and geolocation)
                
                break;
        
            case 2: 

                break;
        }

        if ( optSelected != 3 ) await pause();

    } while ( optSelected != 3)
}


main();