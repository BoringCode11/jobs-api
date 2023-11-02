const { StatusCodes } = require('http-status-codes')

const notFound = (req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: 'route not found' })
}

module.exports = notFound