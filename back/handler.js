const rp = require('request-promise');

// Options for geometry : contour or centre
function buildUrl(params, geometry) {
    let urlGeoApi = "https://geo.api.gouv.fr/communes";

    let options = [
        "fields=nom,code,codesPostaux,codeDepartement,codeRegion,population",
        "format=geojson",
        "geometry=" + geometry
    ];

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

function getCityCenter(evt, ctx, cb) {

    const item = JSON.parse(evt.body);
    let urlRequestCentre = buildUrl(item, "centre");

    let options = {
        uri: urlRequestCentre,
        json: true
    };

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

function getCityArea(evt, ctx, cb) {

    const item = JSON.parse(evt.body);
    let urlRequestCentre = buildUrl(item, "contour");

    let options = {
        uri: urlRequestCentre,
        json: true
    };

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
