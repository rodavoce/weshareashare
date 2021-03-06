/**
 * DocumentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * TODO
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async upload(req, res) {
    // WARNING!!!!!!! When sending the parameters, the text param always comes first
    let params = req.allParams();
    let file = req.file();

    if(!file || !params) {
      return res.badRequest({response: 'Invalid parameters'});
    }

    try {
      Document.create({name: params.name, owner: params.accessUser.id, mimeType: mimeType}).meta({fetch: true});
    } catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * TODO
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async delete(req, res) {
    return res.ok();
  }
};
