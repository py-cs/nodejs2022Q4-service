# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/py-cs/nodejs2022Q4-service.git
```

Switch to feature/db branch

## Installing NPM modules

```
npm install
```

## Setting up environment

Use provided `.env.example` as a reference. Renaming it to `.env` is enough to start application.

## Running application in docker

```
npm run docker:start
```

This command will build and start multicontainer app in detached mode.
To stop application use

```
npm run docker:stop
```

## Checking for vulnerabilities

```
npm run docker:scan
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
