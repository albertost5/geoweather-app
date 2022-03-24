const { showMenu, pause } = require('./helpers/inquirer')

const main = async() => {
    let optSelected;
    
    do {
        optSelected = await showMenu();

        console.log(optSelected);

        if ( optSelected != 3 ) await pause();
    } while ( optSelected != 3)
    
}


main();