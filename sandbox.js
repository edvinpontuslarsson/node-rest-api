const customError = require('./models/customError')

try {
  throw new customError.ForbiddenError()
} catch (error) {
  // console.log(error)
  if (error instanceof customError.ForbiddenError) {
    console.log('mkay')
  }
}
