const BadRequestError = require('./bad-request-error')
const UnauthenticatedError = require('./unauthenticated')
const CustomAPIError = require('./custom-error')
const NotFoundError = require('./not-found')

module.exports = {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
  NotFoundError
}