# Routes

Routes are used to group related end-points in the api together

we can apply middlewares to all the route end-points using route

```
const userRouter = requier('express').Router()

userRouter.get('/auth', function(req, res) {})

userRouter.post('/auth', function(req, res) {})

app.use('/api/auth', userRouter)
```
