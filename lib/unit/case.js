


/**
 * @implements {unit.ICase}
 * @param {string=} opt_name
 * @constructor
 */
unit.Case = function(opt_name) {

  /**
   * @type {string}
   */
  this.name = opt_name || '';

  /**
   * @type {number}
   */
  this.timeout = unit.DEFAULT_TIMEOUT;

  /**
   * @type {!async.Step}
   */
  this.test = async.nop;

  /**
   * @type {!async.Step}
   */
  this.clean = async.nop;

};


/**
 * @return {number}
 */
unit.Case.prototype.getTimeout = function() {
  return this.timeout;
};


/**
 * @param {number} timeout
 */
unit.Case.prototype.setTimeout = function(timeout) {
  this.timeout = timeout;
};


/**
 * @return {string}
 */
unit.Case.prototype.getName = function() {
  return this.name;
};


/**
 * @param {string} name
 */
unit.Case.prototype.setName = function(name) {
  this.name = name;
};


/**
 * @return {!async.Step}
 */
unit.Case.prototype.getTest = function() {
  return this.test;
};


/**
 * @param {!async.Step} step
 */
unit.Case.prototype.setTest = function(step) {
  this.test = step;
};


/**
 * @return {!async.Step}
 */
unit.Case.prototype.getClean = function() {
  return this.clean;
};


/**
 * @param {!async.Step} step
 */
unit.Case.prototype.setClean = function(step) {
  this.clean = step;
};
