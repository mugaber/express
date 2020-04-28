# Request

## request.header() vs request.headers[]

We can get data that in the request header either by `header()` function or `headers[key]` object

---

## Post Request

To send a post request with data in the body :

1. **Headers**: Content-Type: application/json
2. **Body**: raw -> json object {}

To get the data that have been sent :

1. use `bodyparser` middleware or `express.json()`
2. the data will be available as `req.body` object

---
