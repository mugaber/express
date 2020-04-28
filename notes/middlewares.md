# Middlewares

Are functions that have access to `req` and `res` objects, process them\
and then determine wither to move the req to the next handler by `next`\
or return `res` as it's functionality intilitles.

```
function authMiddleware(req, res, next) {
  cosnt authToken = req.headers['x-auth-token']

  if (!authToken) return res.send('Unauthorized')

  next()
}

app.get('/user, authMiddleware, (req, res) => {})
```
