const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  let customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later'
  }

  if (err.name === 'ValidationError') {
    customErr.msg = Object.values(err.errors).map(item => item.message).join(',')
    customErr.statusCode = 400
  }

  if (err.code && err.code === 11000) {
    customErr.msg = `Duplicate value entered for ${Object.values(err.keyValue)} please choose another value`
    customErr.statusCode = 400
  }

  if (err.name === 'CastError') {
    customErr.msg = `No item found with id: ${err.value}`
    customErr.statusCode = 404
  }

  return res.status(customErr.statusCode).json({ msg: customErr.msg })
}

module.exports = errorHandler