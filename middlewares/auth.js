const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token)
    return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] })
  }
}
