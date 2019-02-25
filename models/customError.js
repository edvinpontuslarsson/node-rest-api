'use strict'

class InternalServerError extends Error {}

class UsernameTooShortError extends Error {}

class UsernameTooLongError extends Error {}

class PasswordTooShortError extends Error {}

class PasswordsDoNotMatchError extends Error {}

class WrongUsernameOrPasswordError extends Error {}

class OccupiedUsernameError extends Error {}

class ForbiddenError extends Error {}

module.exports = {
  InternalServerError,
  PasswordsDoNotMatchError,
  UsernameTooShortError,
  UsernameTooLongError,
  PasswordTooShortError,
  WrongUsernameOrPasswordError,
  OccupiedUsernameError,
  ForbiddenError
}
