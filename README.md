# Payroll Backend API

- ## Instructions:

  - Do not PUSH to the main branch for any reason, that's the production branch
  - Push to a feature branch and then create a pull request to `develop` branch

### Error Handling

```
// by calling the next(err) and pass the error as a parameter will automatically trigger the middleware responsible for error handling
try {
  ...
  // throw error when suspected
} catch (err) {
    err.statusCode = errorCode; // pass status code here,  default is 500
    next(err) // this calls the error handler
  }
```

### Run locally

```
Clone repo
npm install
npm run dev // To start developement mode
```