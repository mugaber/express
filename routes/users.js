const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const UserModel = require('../models/User')
const authMiddleware = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

/**
 * @route     api/users/auth  GET
 * @desc      Get auth user data
 * @access    private
 */

router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    return res.json(user)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: [{ msg: 'Error retrieving user ' + err.message }] })
  }
})

/**
 * @route     api/users/auth  POST
 * @desc      Auth user & get token
 * @access    public
 */

router.post(
  '/',

  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credintials' }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credintials' }] })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err
        res.json({ token })
      })
    } catch (error) {
      res.status(500).send('Server Error ' + error.message)
    }
  }
)

/**
 * @route     api/users/ POST
 * @desc      register a new user
 * @access    public
 */

router.post(
  '/',

  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please provide a valid email address').isEmail(),
    check('password', 'Password min: 6 charchters').isLength({ min: 6 }),
    check('password', 'Password max: 30 charachters').isLength({ max: 30 }),
  ],

  function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { username, email, password } = req.body

    UserModel.findOne({ email })
      .then(doc => {
        if (doc) return res.status(400).json({ errors: [{ msg: 'User already exists' }] })

        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

        new UserModel({ username, email, password: hash })
          .save()
          .then(doc => {
            const payload = {
              user: {
                id: doc.id,
              },
            }

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: 36000,
              },
              (err, token) => {
                if (err)
                  return res
                    .status(500)
                    .json({ errors: [{ msg: 'Error signing token' }] })

                return res.json({ token })
              }
            )
          })
          .catch(err => res.json({ errors: [{ msg: 'Error saving user ' + err }] }))

        //
      })
      .catch(err => {
        console.error(err.message)
        return res.status(500).json({ errors: [{ msg: ' error' }] })
      })
  }
)

module.exports = router
