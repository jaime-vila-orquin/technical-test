# TECHNICAL TEST

Technical Test is a technical test for W2M team.

## Dependencies

- Node: v16.14.0 | NPM: 8.3.1

## Run Locally Technical-test

- Install dependencies from the project directory.

```bash
  npm i
```

- Install dependencies from the mocked-server.

```bash
  cd mocked-server
  npm i
```

- Run the app.

```bash
  npm run serve:all
```

(also you can run just the app or mocked-server)

```bash
  npm run serve:app
  npm run serve:mock
```

## Run project with Docker

- Creating docker image

```bash
  docker build -t technical-test .
```

- Running docker image

```bash
  docker run -d -it -p 81:80 technical-test
```

- Start the server(bbdd) in a new terminal

```bash
  npm run json:server
```

- Checking if the app is running

```bash
  http://localhost:81/home
```
