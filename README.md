# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/py-cs/nodejs2022Q4-service.git
```

Switch to feature/auth-logs branch

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

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```

## Docs

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Logs

With default settings (`.env.example`) `logs/` directory will be created in container and bind-mounted to `logs` directory in project folder. Error logs are stored inside `logs/errors` folder.
Requests are marked with `-->` and written under DEBUG level. Responses are marked with `<--` and written under DEBUG level in case of successful operation and under WARN level if an error occured while processing request. Logging level can be configured in `.env` file from 0 (all messages) to 4 (just errors).
Also hidding credentials (passwords and tokens) can be enabled in `.env`
