/**
 * serverError.js
 *
 * @description :: Send a custom response.
 * @docs        :: https://sailsjs.com/docs/concepts/custom-responses
 *
 * Usage:
 * ```
 * return res.serverError()
 * return res.serverError(data)
 * ```
 *
 * @param  {JSON?} data
 */

module.exports = function resServerError(data) {

  // Get access to `req` and `res`
  data = data || {response: 'Server error'};
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 500;

  // Log a message, if desired.
  sails.log('Ran custom response: res.serverError()');

  // If no data was provided, use res.sendStatus().
  if (_.isUndefined(data)) {
    return res.sendStatus(statusCodeToSet);
  }

  if (_.isError(data)) {
    // If the provided data is an Error instance, then log it as verbose.
    sails.log.verbose('Custom response `res.foobar()` called with an Error:', data);

    // If the error doesn't have a custom .toJSON(), use its `stack` instead--
    // otherwise res.json() would turn it into an empty dictionary.
    // (If this is production, don't send a response body at all.)
    if (!_.isFunction(data.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(statusCodeToSet);
      }
      else {
        res.status(statusCodeToSet);
        return res.send(data.stack);
      }
    }
  }

  // Set status code and send response data.
  res.status(statusCodeToSet);
  return res.json(data);

};
