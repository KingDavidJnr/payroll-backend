# PS-8-BE

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

**Reach out to me incase any issue arises while running the project locally 👋👋**

- Email - kingsleyaham6@gmail.com
- whatsapp - +2347054280223
