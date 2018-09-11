# CityViz

### Project

This project uses the data provided by the french government [here](https://api.gouv.fr/api/api-geo.html)
An API is available with several endpoints, multiple inputs are possible but it always send back geojson data.
The front part display a map created with Leaflet and has an interface to communicate with the API.

### Several Ideas

* Given a longitude/latitude, sends back the region in France corresponding (using [this](https://public.opendatasoft.com/explore/dataset/contours-geographiques-des-nouvelles-regions-metropole/information))
* Given a longitude/latitude, sends the closest city and the area of the city (using [this](https://api.gouv.fr/api/api-geo.html))
* Drawing mode : post longitude/latitude or name of a city, store it in a DynamoDB database and display a polygon with the different cities stored
* Drawing mode : choose an already created geometry map

### Instructions

You must follow the back instructions in the README and then the instructions in the front

### Screenshot

![alt text](intermediate_screenshot.png)
