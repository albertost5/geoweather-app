const { showMenu, pause, readInputCity } = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async() => {
    
    let optSelected;

    do {

        optSelected = await showMenu();

        switch (optSelected) {
            case 1:
                const city = await readInputCity();
                console.log(city);

                // ask for a city
                // call the endpoint to get all possible cities
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