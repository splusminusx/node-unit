


/**
 * @implements {unit.ICase}
 * @param {string=} opt_name
 * @constructor
 */
unit.Case = function(opt_name) {

  /**
   * @type {string}
   */
  this.__name = opt_name || '';

  /**
   * @type {number}
   */
  this.__timeout = unit.DEFAULT_TIMEOUT;

  /**
   * @type {!async.Step}
   */
  this.__test = async.nop;

  /**
   * @type {!async.Step}
   */
  this.__clean = async.nop;

};


/**
 * @return {number}
 */
unit.Case.prototype.getTimeout = function() {
  return this.__timeout;
};


/**
 * @param {number} timeout
 */
unit.Case.prototype.setTimeout = function(timeout) {
  this.__timeout = timeout;
};


/**
 * @return {string}
 */
unit.Case.prototype.getName = function() {
  return this.__name;
};


/**
 * @param {string} name
 */
unit.Case.prototype.setName = function(name) {
  this.__name = name;
};


/**
 * @return {!async.Step}
 */
unit.Case.prototype.test = function() {
  return this.__test;
};


/**
 * @param {!async.Step} step
 */
unit.Case.prototype.setTest = function(step) {
  this.__test = step;
};


/**
 * @return {!async.Step}
 */
unit.Case.prototype.clean = function() {
  return this.__clean;
};


/**
 * @param {!async.Step} step
 */
unit.Case.prototype.setClean = function(step) {
  this.__clean = step;
};
