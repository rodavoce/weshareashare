/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const uid = require('rand-token').uid;
const ID_LENGTH = 32;

module.exports = {
  /**
   * Creates a new client-id
   * @param req
   * @param res
   */
  create(req, res) {
    Client.create({id: uid(ID_LENGTH)}).meta({fetch: true})
      .then((client) => {
        return res.ok({ client });
      })
      .catch(err => {
        return res.serverError(err);
      });
  },
};
