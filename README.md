# travel-history-api
Travel History API, developed as part of job application interview process for Shell Digital Ventures.
The API is located at [travel-history-api](https://n13t3f6q5i.execute-api.eu-west-1.amazonaws.com/dev)

# For full spec, please follow the link below:
  [spec](https://elvin-specs.s3-eu-west-1.amazonaws.com/Backend+engineer+(interview).pdf)

# Solution

*Diagram coming*

# Endpoints:
  POST - https://n13t3f6q5i.execute-api.eu-west-1.amazonaws.com/dev/trip
  GET - https://n13t3f6q5i.execute-api.eu-west-1.amazonaws.com/dev/trips/{captainName}

# For full API documentation, please follow the link below:
  [docs](https://app.swaggerhub.com/apis/connect-the-dots-ltd/travel-history-api/1.0.0)

# To test out the deployed API, please  follow the link below:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8d0605bd914859b48813)

# To run on dev:

Requirements:

install [nodejs](https://nodejs.org/en/)@8.11.3
install [Serverless](https://serverless.com/)@1.57.0

`git clone https://github.com/lvnhmd/travel-history-api.git && cd travel-history-api && npm i`

*Note* I am using [Mongo Atlas](https://docs.atlas.mongodb.com/getting-started/) for storage, to be able to run the api locally you need to create a cluster and add *.env* file in the root directory of the the project with the following content:

>DB=<mongodb_connection_string>

`sls offline start --skipCacheInvalidation`

# To test:
`npm test`

# TODO
1. Add schema validation
2. Add integration tests
3. Rate limit POST /trip

# Assumptions
1. I have assumed that we have access to the pre-existing internal API which is logging the arrival information so that I can change it's output as I require extra information to be logged, i.e
{
    "captainName": "Patsy Stone",
    "vesselName": "El Tauro",
    "arrivalDate": "2056-01-06T15:30:00Z",
    "departureDate": "2056-01-05T15:30:00Z",
    "arrivalPort": "Singapore",
    "departurePort": "Tokyo"
}
I also renamed the properties as in the original example it is not clear which port is being logged (the assumption being it is the arrival port)

2. For the purposes of this exercise, we do not need authentication

3. Chronological means ascending order

4. As there are on average 102,465 flights per day , this log will grow linearly very fast and probably lambda's resources will not be enough to do the sort , but for now the assumption is we have rate limit on trips being logged ( i.e hitting POST /trip )
