# Installation

Node version > 8

```
npm install -g serverless
npm install -g serverless-components
npm install
```

# Start

```
components deploy
```

# Example

With this request example, we get the center of any city in France giving a latitude or longitude of this city

```
curl --request POST \
  --url https://p4rc7y2o01.execute-api.us-east-1.amazonaws.com/dev/city/centre \
  --header 'content-type: application/json' \
  --data '{
      "lat": "49.895",
      "lon": "2.3022"
    }'
```

With this request example, we get the area of any city in France giving a latitude or longitude of this city

```
curl --request POST \
  --url https://p4rc7y2o01.execute-api.us-east-1.amazonaws.com/dev/city/area \
  --header 'content-type: application/json' \
  --data '{
      "lat": "49.895",
      "lon": "2.3022"
    }'
```


# Stop

```
components remove
```
