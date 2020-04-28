# Validation

## express-validator

Used for validating user data and sanitize functions

**validating post request**

1. use check('key', 'message').coditions()
2. use validationResults(req) to return the errors if any

```
const {check, validationResults} = require('express'validator')

app.get('/user',
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  function(req, res) {
    const errors = valiadtionResults(req)
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
  }
)
```

- errors.array() : [{msg: 'Name is required', param: 'name', location: 'body'}]
