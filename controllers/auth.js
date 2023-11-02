const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ token, user: { name: user.name } })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('email and password must be provided')
  }

  // get user from the DB
  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPwdCorrect = await user.comparePassword(password)

  if (!isPwdCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register, login
}