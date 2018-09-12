# Front CityViz

### Requirements

Node version > 8

### Installation

```
npm install
```

### Start

You need to update the API url with the one that was provided when you deployed your back components. (it is a todo to use an environment variable)
Open the src/inputs/Inputs.js file and change the API_URL value with the one that you got

```
npm start
```

### Deploy

You can follow [this tutorial](https://serverless.com/blog/how-built-static-serverless-website-netlify/) with this build command : cd front && npm install && npm run build and this publish directory : front/build

<!-- Or you can use the serverless.yml file, you need to write your Netlify and Github API tokens in the file, once it is done, if you have correctly configured the file.

You then need to install the serverless packages :

``` bash
npm install -g serverless
npm install -g serverless-components
```

You then need to load your AWS credentials, the easiest way is the following :

``` bash
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
```

When running the following command, the serverless component will be deployed

``` bash
components deploy
``` -->

### Todos

* Create a service that will deal with the http requests
* Separate the inputs component into smaller components (too big file)
* Use an environment varialble for the API_URL
* Write tests

### Idea

* Use the react leaflet library
