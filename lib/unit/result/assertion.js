


/**
 * @implements {unit.result.IAssertion}
 * @constructor
 * @param {boolean} value
 * @param {string=} opt_comment
 */
unit.result.Assertion = function(value, opt_comment) {

  /**
   * @type {boolean}
   */
  this.__value = value;

  /**
   * @type {string}
   */
  this.__comment = opt_comment || '';
};


/**
 * @inheritDoc
 */
unit.result.Assertion.prototype.get = function() {
  return this.__value;
};


/**
 * @inheritDoc
 */
unit.result.Assertion.prototype.getComment = function() {
  return this.__comment;
};
