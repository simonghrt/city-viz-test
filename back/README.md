# Back CityViz

### Requirements

Node version > 8

The serverless packages installed globally, you can do it this way :

``` bash
npm install -g serverless
npm install -g serverless-components
```

### Installation

``` bash
npm install
```

### Start

You first need to load your AWS credentials, the easiest way is the following :

``` bash
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
```

When running the following command, the different serverless components will be deployed

``` bash
components deploy
```

### API Examples

With this request example, we get the center of any city in France giving a latitude or longitude of this city

```
curl --request POST \
  --url https://u7nhp75j86.execute-api.us-east-1.amazonaws.com/dev/city/centre \
  --header 'content-type: application/json' \
  --data '{
      "lat": "49.895",
      "lon": "2.3022"
    }'
```

With this request example, we get the area of any city in France giving a latitude or longitude of this city

```
curl --request POST \
  --url https://u7nhp75j86.execute-api.us-east-1.amazonaws.com/dev/city/area \
  --header 'content-type: application/json' \
  --data '{
      "lat": "49.895",
      "lon": "2.3022"
    }'
```

With this request example, we get the center of any city in France giving the name of this city

```
curl --request POST \
  --url https://u7nhp75j86.execute-api.us-east-1.amazonaws.com/dev/city/centre \
  --header 'content-type: application/json' \
  --data '{
      "name": "Amiens"
    }'
```

With this request example, we get the area of any city in France giving the name of this city

```
curl --request POST \
  --url https://u7nhp75j86.execute-api.us-east-1.amazonaws.com/dev/city/area \
  --header 'content-type: application/json' \
  --data '{
      "name": "Amiens"
    }'
```


### Stop

``` bash
components remove
```

### Test

You need to update the API url with the one that was provided when you deployed your back components. (it is a todo to use an environment variable)
Open the test.js file and change the API_URL value with the one that you got

Once it's done, run :
``` bash
npm run test
```

### Todos

* Write tests
* Use DynamoDB to store the different inputs
* Add authentication
* Send 200 status code instead of 201
* Have a better code structure (separate into several files)
* Write tests on the API using directly the functions that are in the handler.js file
