/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const moment = require('moment');

const expiresIn = expiresAt =>
  Math.round(moment.duration(
    moment(expiresAt).diff(moment())
  ).asSeconds());

const formatTokenResponse = (accessToken, refreshToken, user) => ({
  tokens: {
    access: {
      type: 'access',
      value: accessToken.value,
      expiresIn: expiresIn(accessToken.expiresAt),
    },

    refresh: {
      type: 'refresh',
      value: refreshToken.value,
    }
  },
  user: {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  },
});

module.exports = {
  create(req, res) {
    let params = req.allParams();
    User.create({email: params.Email, firstName: params.FirstName, lastName: params.LastName, password: params.Password}).meta({fetch: true})
      .then((user) => {
        return user;
      }).then((user) => {
        let email = sails.config.custom.email;
        email.send({
          template: 'register',
          message: {
            to: user.email
          },
          locals: {
            name: user.username,
            email: user.email,
          }
        });
        return user;
      }).then((user) => {
        Token.findOrAdd({
          user: user.id,
          type: 'access',
        }).then((accessToken) => {
          Token.findOrAdd({
            user: user.id,
            type: 'refresh',
          }).then((refreshToken) => {
            return res.ok(formatTokenResponse(accessToken, refreshToken, user));
          }).catch((err) => {
            return res.serverError(err);
          });
        });
      }).catch((err) => {
        sails.helpers.customValidation({model: User, err: err})
          .then((customErrors) => {
            return res.serverError(customErrors);
          }).catch((error) => {
            return res.serverError(error);
          });
      });
  },

  getAll(req, res) {
    User.find()
      .then((users) => {
        res.ok({ users });
      }).catch((err) => {
        return res.serverError(err);
      });
  },
};
