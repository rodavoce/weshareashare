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

/**
 * Formats the tokens with a proper structure
 * @param accessToken
 * @param refreshToken
 * @param user
 * @returns {{tokens: {access: {type: string, value, expiresIn: *}, refresh: {type: string, value}}, user: {id: *, email: *, firstName: *|null, lastName: *|null}}}
 */
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
    cause: user.cause,
  },
});

module.exports = {
  /**
   * Creates a new user, using the basic passport policy
   * @param req
   * @param res
   */
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
          name: user.firstName + ' ' + user.lastName,
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

  /**
   * Selects a new cause that the user will now support
   * @param req
   * @param res
   */
  selectCause(req, res) {
    let params = req.allParams();
    sails.log(params);
    let userId = req.param('userId');
    let causeId = req.param('causeId');
    User.update({id: userId},{cause: causeId !== '0' ? causeId : null, causeName: req.param('causeName')}).exec(function afterwards(err) {
      if (err)
      {return res.serverError(err);}
      User.findOne({
        id: userId
      }).exec(function (err, user){
        if (err) {
          console.log(err);
          return res.serverError(err);
        }
        delete user.password;
        res.ok({ 'message': 'Cause selected successfully.', 'user': user });
      });
    });
  },

  /**
   * Returns the current cause supported by the user
   * @param req
   * @param res
   */
  getCause(req, res) {
    let userId = req.param('userId');
    User.findOne({
      id: userId
    }).exec(function (err, user){
      if (err)
      {return res.serverError(err);}

      let causeId = user.cause;
      Cause.findOne({
        id: causeId
      }).exec(function (err, cause) {
        if (err)
        {return res.serverError(err);}

        if (!cause) {
          if(user.causeName != null) {
            res.ok({
              name: user.causeName,
            })
          } else res.ok({'message': 'User has not cause.'});
        }
        else {
          res.ok(cause);
        }
      });
    });
  },
};
