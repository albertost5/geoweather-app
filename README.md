# Geoweather app
A console app to provide the weather and location information about a place given as input.

## Initialize
Install the dependencies:
```
npm install
```
## Config
Before to initialize the app you need to set up some config variables. Using the .env.example create your .env file to run the app.
```
MAPBOX_KEY="MAPBOX API KEY"
OPENWEATER_KEY="OPEN WEATHER API KEY"
LANGUAGE_RESPONSE="LANGUAGE (es/fr/nl/en...)"
DB_PATH="./yourDirectoryName"
FILENAME_DB="fileName.json"
```
After creating this file you'll be able to run the app.

## First run
There are two commands to initialize the app:
```
npm start
node app
```

## API
I have used two API to build the application so in order to make it work, you'll need the API Key for those as it's mentioned in the config section. 
Check these links, to create an account for free, to get the API Key needed:
Location: https://www.mapbox.com/
Weather: https://openweathermap.org/
