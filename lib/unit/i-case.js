


/**
 * @interface
 */
unit.ICase = function() {};


/**
 * @return {string}
 */
unit.ICase.prototype.getName = function() {};


/**
 * @return {number}
 */
unit.ICase.prototype.getTimeout = function() {};


/**
 * @return {!async.Step}
 */
unit.ICase.prototype.test = function() {};


/**
 * @return {!async.Step}
 */
unit.ICase.prototype.clean = function() {};
