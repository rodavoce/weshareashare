/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * Creates or updates the user's personal details
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async postParticipant(req, res) {
    let attrs = req.allParams();
    let parsedAttrs = Person.parseAttrs(attrs.participant);

    let userId = req.query.accessUser.id;
    parsedAttrs.user = userId;

    try {
      let user = await User.findOne({id: userId});

      if (user.person) {
        Person.update({id: user.person}, parsedAttrs).meta({fetch: true}).then(() => {
          return res.ok({response: 'Dados pessoais atualizados.'});
        });
      } else {
        Person.create(parsedAttrs).meta({fetch: true}).then(() => {
          return res.ok({response: 'Dados pessoais atualizados.'});
        });
      }
    } catch(err) {
      return res.serverError(err);
    }
  }
};
