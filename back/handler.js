const rp = require('request-promise');

// Options for geometry : contour or centre
function buildUrl(lat, lon, geometry) {
    let urlGeoApi = "https://geo.api.gouv.fr/communes";

    let options = [
        "fields=nom,code,codesPostaux,codeDepartement,codeRegion,population",
        "format=geojson",
        "geometry=" + geometry,
        "lat=" + lat,
        "lon=" + lon
    ];

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
    let urlRequestCentre = buildUrl(item.lat, item.lon, "centre");

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
    let urlRequestCentre = buildUrl(item.lat, item.lon, "contour");

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
