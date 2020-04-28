# User

## Register

## Usign jwt

1. validate the data
2. check if user exists
3. hash password
4. save user to db
5. assign jwt and return

```
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('path/to/user/model')

app.post('/api/user', validateData, async (req, res) => {
  const {email, password} = req.body

  try {
    const user await User.findOne({email})
    if (user) return res.status(400).json({errors: [{msg: 'User already exists'}]})

    const hash = bcrypt.hashSync(password, bcrypt.getSaltSync(10))

    const user = new User({name: password: hash})
    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, 'jwtsecret', {experiesIn: 30000}, (err, token) => {
      if (err) return res.send('token error')

      return res.json({token})
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({errors: [{msg: 'Error registering user' + err.message}]})
  }
})
```

### Authorization

```
const authorize = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) return res.json({msg: 'No token'})

  try {
    const decoded = jwt.verify(token, 'secret')
    req.user = decoded.user // user.id
    next()
  } catch(err) {
    res.json({msg: 'Invalid token' + err})
  }
}

app.get('/auth', authorize, (req, res) => {})
```

### Get user after auth

- Set `x-auth-token` to `token` in `Headers` request

```
app.get('users/auth', authorize, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    return res.json(user)
  } catch(err) {
    return res.json({error: 'Server error' + err})
  }
})
```

---
