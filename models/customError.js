'use strict'

class InternalServerError extends Error {}

class NotFoundError extends Error {}

class UsernameTooShortError extends Error {}

class UsernameTooLongError extends Error {}

class PasswordTooShortError extends Error {}

class PasswordsDoNotMatchError extends Error {}

class WrongUsernameOrPasswordError extends Error {}

class OccupiedUsernameError extends Error {}

class ForbiddenError extends Error {}

module.exports = {
  InternalServerError,
  NotFoundError,
  PasswordsDoNotMatchError,
  UsernameTooShortError,
  UsernameTooLongError,
  PasswordTooShortError,
  WrongUsernameOrPasswordError,
  OccupiedUsernameError,
  ForbiddenError
}
