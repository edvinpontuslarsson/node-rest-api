'use strict'

const customError = require('../models/customError')

const getHttpErrorCode = error => {
  if (error instanceof customError.WrongUsernameOrPasswordError) {
    return 401
  }
  if (error instanceof customError.ForbiddenError) {
    return 403
  }
  if (error instanceof customError.NotFoundError) {
    return 404
  }
  if (error instanceof customError.InternalServerError) {
    return 500
  }

  // for other, unknown, errors:
  return 500
}

module.exports = {
  getHttpErrorCode
}
