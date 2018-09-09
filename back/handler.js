const rp = require('request-promise');

/**
 * Builds the url for the city data
 * @param {object} params - The different input params
 * @param {string} geometry - The type of geometry used (center or area available)
 * @return {string} - The built url that will be used after for the request
 */
function buildUrl(params, geometry) {
    let urlGeoApi = "https://geo.api.gouv.fr/communes";

    let options = [
        "fields=nom,code,codesPostaux,codeDepartement,codeRegion,population",
        "format=geojson",
        "geometry=" + geometry
    ];

    // We verify what are the inputs in order to correctly build the url
    if (params.hasOwnProperty('name')) {
        options.push("nom=" + params["name"]);
    } else if (params.hasOwnProperty('lat') && params.hasOwnProperty('lon')) {
        options.push("lat=" + params["lat"]);
        options.push("lon=" + params["lon"]);
    } else {
        cb("Missing parameters in the url");
    }

    options.forEach((option, index) => {
        if (index == 0) {
            urlGeoApi += "?" + option;
        } else {
            urlGeoApi += "&" + option;
        }
    });

    return urlGeoApi;
}

/**
 * Gets the city center
 * @param {object} evt - The event that contains the different parameters
 * @param {object} ctx - Not sure
 * @param {object} cb - Callback
 */
function getCityCenter(evt, ctx, cb) {

    const item = JSON.parse(evt.body);
    let urlRequestCentre = buildUrl(item, "centre");

    let options = {
        uri: urlRequestCentre,
        json: true
    };

    // We make the get request to the third party API
    rp(options)
    .then((geometries) => {
        cb(null, {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(geometries)
        });
    })
    .catch((err) => {
        cb(err);
    });
}

/**
 * Gets the city area
 * @param {object} evt - The event that contains the different parameters
 * @param {object} ctx - Not sure
 * @param {object} cb - Callback
 */
function getCityArea(evt, ctx, cb) {

    const item = JSON.parse(evt.body);
    let urlRequestCentre = buildUrl(item, "contour");

    let options = {
        uri: urlRequestCentre,
        json: true
    };

    // We make the get request to the third party API
    rp(options)
    .then((geometries) => {
        cb(null, {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(geometries)
        });
    })
    .catch((err) => {
        cb(err);
    });
}

module.exports = {
    getCityCenter,
    getCityArea
}
