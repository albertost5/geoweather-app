require('colors');
const inquirer = require('inquirer');

const optionsMenu = ['Exit', 'Find a place', 'Records'];

const questionsMenu = [{
    type: 'list',
    name: 'option',
    message: 'What you want to do? ',
    choices: [
        {
            value: 1,
            name: `${ '1.'.green } ${ optionsMenu[1] }`
        },
        {
            value: 2,
            name: `${ '2.'.green } ${ optionsMenu[2] }`
        },
        {
            value: 3,
            name: `${ '3.'.green } ${ optionsMenu[0] }`
        }
    ]
}];

async function showMenu() {
    console.clear();
    console.log('=================='.green);
    console.log(' Select one option');
    console.log('=================='.green);

    const { option } = await inquirer.prompt(questionsMenu);

    return option;
}

async function pause() {
    const { pause } = await inquirer.prompt([{
        type: 'input',
        name: 'pause',
        message: `Press ${'ENTER'.green } to continue.` 
    }])
}

async function readInputCity() {
    const { city } = await inquirer.prompt([{
        type: 'input',
        name: 'city',
        message: 'Enter a city: ',
        validate(value) {
            if( value == '' ) return 'Please enter a city, the field can not be blank.'.red
            return true;
        }
    }]);

    return city.trim();
}

async function showPlaces( places  = [] ) {

    const choices = places.map(( place, index ) => {
        const i = index + 1;;
        return {
            value: place.id,
            name: `${ i }. `.green + place.name

        }
    });

    choices.unshift({
        value: 0,
        name: '0. '.green + 'Cancel'
    });

    const { place_id } = await inquirer.prompt([{
        type: 'list',
        name: 'place_id',
        message: 'Wich place do you want to get geoweather information?',
        choices: choices
    }]);
    
    return place_id;
}

module.exports = {
    showMenu,
    pause,
    readInputCity,
    showPlaces
}