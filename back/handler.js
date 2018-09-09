const rp = require('request-promise');
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

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

function addCity(evt, ctx, cb) {
    const item = JSON.parse(evt.body);
    let urlRequestCentre = buildUrl(item, "centre");

    let options = {
        uri: urlRequestCentre,
        json: true
    };

    rp(options)
    .then((geometries) => {
        if (geometries["features"] && geometries["features"]["geometry"] && geometries["features"]["geometry"]) {
            let id = '_' + Math.random().toString(36).substr(2, 9); // Random id
            let newCity = {
                "lat": geometries["features"]["geometry"]["coordinates"][1],
                "lon": geometries["features"]["geometry"]["coordinates"][0],
                "id": id
            };
            dynamo.put({
                Item: newCity,
                TableName: "cities"
            }, (err, resp) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, {
                        statusCode: 201,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(resp)
                    });
                }
            });
        }
    })
    .catch((err) => {
        cb(err);
    });
}

function getCities(evt, ctx, cb) {
    dynamo.scan({
        TableName: tableName
    }, (err, data) => {
        if (err) {
            cb(err);
        } else {
            const cities = data.Items;
            cb(null, {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(cities)
            });
        }
    });
}

module.exports = {
    getCityCenter,
    getCityArea
}
