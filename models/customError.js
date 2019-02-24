'use strict'

// just inform about correct args
class IncorrectArgumentsError extends Error {}

class InternalServerError extends Error {}

class PasswordsDoNotMatchError extends Error {}

class MissingUsernameError extends Error {}

class MissingPasswordError extends Error {}

class UsernameTooShortError extends Error {}

class UsernameTooLongError extends Error {}

class PasswordTooShortError extends Error {}

class WrongUsernameOrPasswordError extends Error {}

class OccupiedUsernameError extends Error {}

class ForbiddenError extends Error {}

module.exports = {
    IncorrectArgumentsError,
    InternalServerError,
    PasswordsDoNotMatchError,
    MissingUsernameError,
    MissingPasswordError,
    UsernameTooShortError,
    UsernameTooLongError,
    PasswordTooShortError,
    WrongUsernameOrPasswordError,
    OccupiedUsernameError,
    ForbiddenError
}
