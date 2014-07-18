


/**
 * @implements {unit.ICase}
 * @param {string=} opt_name
 * @constructor
 */
unit.test.Case = function(opt_name) {

  /**
   * @type {string}
   */
  this.__name = opt_name || '';

  /**
   * @type {number}
   */
  this.__timeout = unit.DEFAULT_TIMEOUT;

};


/**
 * @return {number}
 */
unit.test.Case.prototype.getTimeout = function() {
  return this.__timeout;
};


/**
 * @return {string}
 */
unit.test.Case.prototype.getName = function() {
  return this.__name;
};


/**
 * @return {!async.Step}
 */
unit.test.Case.prototype.test = function() {
  return async.nop;
};


/**
 * @return {!async.Step}
 */
unit.test.Case.prototype.clean = function() {
  return async.nop;
};
